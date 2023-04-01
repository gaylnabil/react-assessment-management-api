using Microsoft.EntityFrameworkCore;
using react_assessment_management_api.Models;

namespace react_assessment_management_api.Data
{
    public class AssessementDbContext : DbContext
    {
        public AssessementDbContext(DbContextOptions<AssessementDbContext> options)
            : base(options)
        {

        }

        public DbSet<Company>? Companies { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Wholesaler>? Wholesalers { get; set; }
        public DbSet<Stock>? Stocks { get; set; }
        public DbSet<Order>? Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .HasMany(c => c.Products)
                .WithOne(product => product.Company);

            modelBuilder.Entity<Wholesaler>()
                .HasMany(w => w.Stocks)
                .WithOne(stock => stock.Wholesaler);

            //modelBuilder.Entity<Stock>().HasKey(s => new { s.ProductId, s.WholesalerId });

            modelBuilder.Entity<Product>()
                .HasMany(b => b.Stocks)
                .WithOne(stock => stock.Product);

            modelBuilder.Entity<Stock>()
                .HasOne(s => s.Wholesaler)
                .WithMany(w => w.Stocks)
                .HasForeignKey(s => s.WholesalerId);

            modelBuilder.Entity<Stock>()
                .HasOne(s => s.Product)
                .WithMany(b => b.Stocks)
                .HasForeignKey(s => s.ProductId);

            modelBuilder.Entity<Order>()
              .HasOne(s => s.Wholesaler)
              .WithMany(w => w.Orders)
              .HasForeignKey(s => s.WholesalerId);

            modelBuilder.Entity<Order>()
                .HasOne(s => s.Product)
                .WithMany(b => b.Orders)
                .HasForeignKey(s => s.ProductId);
        }



        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Product>()
        //        .HasOne(Product => Product.Company)
        //        .WithMany(brw => brw.Products);
        //}
    }
}
