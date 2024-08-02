using Bunshack_Restaurant.Server.Data.Context;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
using Bunshack_Restaurant.Server.Repositories.Concrete;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    var connectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_dbBunshack");
    options.UseSqlServer(connectionString);
});

builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ApplicationDbContext>();

// Add Identity services
builder.Services.AddIdentityCore<User>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireUppercase = true;
    options.Password.RequireDigit = true;
    options.Password.RequireNonAlphanumeric = false;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    options.User.AllowedUserNameCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+!";
    options.User.RequireUniqueEmail = true;

}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapIdentityApi<User>();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
