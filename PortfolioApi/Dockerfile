# Build the ASP.NET Core API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

COPY PortfolioApi/PortfolioApi.csproj PortfolioApi/
RUN dotnet restore PortfolioApi/PortfolioApi.csproj

COPY PortfolioApi/ PortfolioApi/
RUN dotnet publish PortfolioApi/PortfolioApi.csproj -c Release -o /app/publish --no-restore

# Run only the published API in the final image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 10000
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000} dotnet PortfolioApi.dll"]
