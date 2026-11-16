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
    contactEmail = "mldprasad2003@gmail.com"
})
.WithName("GetPortfolioProfile");

app.MapGet("/api/projects", () => new[]
{
    new
    {
        id = 1,
        title = "Business Website",
        description = "A responsive website for a small business.",
        technologies = new[] { "HTML", "CSS", "JavaScript" }
    },
    new
    {
        id = 2,
        title = "Customer Enquiry API",
        description = "An API for receiving and managing customer enquiries.",
        technologies = new[] { "ASP.NET Core", ".NET 10", "PostgreSQL" }
    }
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

app.MapGet("/api/enquiries", async (PortfolioDbContext database) =>
{
    return await database.Enquiries
        .OrderByDescending(item => item.CreatedAt)
        .ToListAsync();
})
.WithName("GetEnquiries");

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

class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
    : DbContext(options)
{
    public DbSet<Enquiry> Enquiries => Set<Enquiry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var enquiry = modelBuilder.Entity<Enquiry>();

        enquiry.ToTable("enquiries");
        enquiry.HasKey(item => item.Id);
        enquiry.Property(item => item.Name).HasMaxLength(120).IsRequired();
        enquiry.Property(item => item.Email).HasMaxLength(320).IsRequired();
        enquiry.Property(item => item.Message).HasMaxLength(2000).IsRequired();
    }
}
