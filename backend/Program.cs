
using Microsoft.EntityFrameworkCore;
using react_assessment_management_api.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//Enable Cross-Origin Requests
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:7146", "http://localhost:3000");
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
            policy.AllowCredentials();
        });
});

// ConnectionStringAssessement is in appsettings.json
builder.Services.AddDbContext<AssessementDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStringAssessment"))
    );
// Add services to the container.

//builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Enable Cross-Origin Requests
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();