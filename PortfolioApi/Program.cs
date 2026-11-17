using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var allowedOrigins = builder.Configuration
    .GetSection("AllowedOrigins")
    .Get<string[]>()
    ?? [
        "http://localhost:5173",
        "https://prasad23009.github.io"
    ];

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("PortfolioDb")
    ?? throw new InvalidOperationException("PortfolioDb is not configured.");

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

app.UseCors("Frontend");

using (var scope = app.Services.CreateScope())
{
    var database = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    await database.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseHttpsRedirection();
}

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.MapGet("/api/profile", () => new
{
    businessName = "Matrix",
    headline = "Technical project guidance for engineering students",
    about = "Matrix provides learning-focused technical project guidance, debugging support, reviews, and documentation help for B.Tech and M.Tech students.",
    supportedBranches = new[]
    {
        "Computer Science Engineering",
        "Information Technology",
        "Electronics and Communication Engineering",
        "Electrical and Electronics Engineering"
    },
    services = new[]
    {
        "Project planning and architecture guidance",
        "Technical review and debugging support",
        "Documentation and presentation guidance"
    },
    publicContactPhone = "6281402892",
    contactEmail = "matrix071705@gmail.com"
})
.WithName("GetPortfolioProfile");

app.MapGet("/api/projects", async (string? branch, PortfolioDbContext database) =>
{
    var projects = database.Projects
        .AsNoTracking()
        .Include(project => project.Documents);

    if (!string.IsNullOrWhiteSpace(branch))
    {
        var normalizedBranch = branch.Trim().ToUpperInvariant();
        projects = projects.Where(project => project.Branch == normalizedBranch);
    }

    return await projects
        .OrderBy(project => project.Branch)
        .ThenBy(project => project.Id)
        .ToListAsync();
})
.WithName("GetPortfolioProjects");

app.MapPost("/api/enquiries", async (ContactEnquiry request, PortfolioDbContext database) =>
{
    var enquiry = new Enquiry
    {
        Name = request.Name.Trim(),
        Email = request.Email.Trim(),
        Message = request.Message.Trim(),
        CreatedAt = DateTimeOffset.UtcNow
    };

    database.Enquiries.Add(enquiry);
    await database.SaveChangesAsync();

    return Results.Created($"/api/enquiries/{enquiry.Id}", new
    {
        message = "Enquiry received.",
        enquiry
    });
})
.WithName("CreateEnquiry");

app.Run();

record ContactEnquiry(string Name, string Email, string Message);

class Enquiry
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
}

class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Technologies { get; set; } = [];
    public List<ProjectDocument> Documents { get; set; } = [];
}

class ProjectDocument
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string DocumentType { get; set; } = "PDF";
    public string PublicUrl { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
    : DbContext(options)
{
    public DbSet<Enquiry> Enquiries => Set<Enquiry>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectDocument> ProjectDocuments => Set<ProjectDocument>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var enquiry = modelBuilder.Entity<Enquiry>();

        enquiry.ToTable("enquiries");
        enquiry.HasKey(item => item.Id);
        enquiry.Property(item => item.Name).HasMaxLength(120).IsRequired();
        enquiry.Property(item => item.Email).HasMaxLength(320).IsRequired();
        enquiry.Property(item => item.Message).HasMaxLength(2000).IsRequired();

        var project = modelBuilder.Entity<Project>();
        project.ToTable("projects");
        project.HasKey(item => item.Id);
        project.Property(item => item.Id).HasColumnName("id");
        project.Property(item => item.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
        project.Property(item => item.Branch).HasColumnName("branch").HasMaxLength(8).IsRequired();
        project.Property(item => item.Description).HasColumnName("description").HasMaxLength(2000).IsRequired();
        project.Property(item => item.Technologies).HasColumnName("technologies").HasColumnType("text[]").IsRequired();
        project.HasMany(item => item.Documents)
            .WithOne()
            .HasForeignKey(item => item.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        var document = modelBuilder.Entity<ProjectDocument>();
        document.ToTable("project_documents");
        document.HasKey(item => item.Id);
        document.Property(item => item.Id).HasColumnName("id");
        document.Property(item => item.ProjectId).HasColumnName("project_id").IsRequired();
        document.Property(item => item.Title).HasColumnName("title").HasMaxLength(180).IsRequired();
        document.Property(item => item.DocumentType).HasColumnName("document_type").HasMaxLength(40).IsRequired();
        document.Property(item => item.PublicUrl).HasColumnName("public_url").HasMaxLength(2000).IsRequired();
        document.Property(item => item.DisplayOrder).HasColumnName("display_order").IsRequired();
    }
}
