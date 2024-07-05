using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Bunshack_Restaurant.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Bunshack_Restaurant.Server.Data.Context
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Menu> Menus { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderMenu> OrderMenus { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the many-to-many relationship
            modelBuilder.Entity<OrderMenu>()
                .HasKey(om => new { om.OrderId, om.MenuId });

            modelBuilder.Entity<OrderMenu>()
                .HasOne(om => om.Order)
                .WithMany(o => o.OrderMenus)
                .HasForeignKey(om => om.OrderId);

            modelBuilder.Entity<OrderMenu>()
                .HasOne(om => om.Menu)
                .WithMany(m => m.OrderMenus)
                .HasForeignKey(om => om.MenuId);

            // Configure the one-to-many relationship between Order and User
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);
        }
    }
}
