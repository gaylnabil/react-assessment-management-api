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

        public DbSet<Brewery>? Breweries { get; set; }
        public DbSet<Beer>? Beers { get; set; }
        public DbSet<Wholesaler>? Wholesalers { get; set; }
        public DbSet<Stock>? Stocks { get; set; }
        public DbSet<Order>? Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brewery>()
                .HasMany(brw => brw.Beers)
                .WithOne(beer => beer.Brewery);

            modelBuilder.Entity<Wholesaler>()
                .HasMany(w => w.Stocks)
                .WithOne(stock => stock.Wholesaler);

            //modelBuilder.Entity<Stock>().HasKey(s => new { s.BeerId, s.WholesalerId });

            modelBuilder.Entity<Beer>()
                .HasMany(b => b.Stocks)
                .WithOne(stock => stock.Beer);

            modelBuilder.Entity<Stock>()
                .HasOne(s => s.Wholesaler)
                .WithMany(w => w.Stocks)
                .HasForeignKey(s => s.WholesalerId);

            modelBuilder.Entity<Stock>()
                .HasOne(s => s.Beer)
                .WithMany(b => b.Stocks)
                .HasForeignKey(s => s.BeerId);

            modelBuilder.Entity<Order>()
              .HasOne(s => s.Wholesaler)
              .WithMany(w => w.Orders)
              .HasForeignKey(s => s.WholesalerId);

            modelBuilder.Entity<Order>()
                .HasOne(s => s.Beer)
                .WithMany(b => b.Orders)
                .HasForeignKey(s => s.BeerId);
        }



        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Beer>()
        //        .HasOne(beer => beer.Brewery)
        //        .WithMany(brw => brw.Beers);
        //}
    }
}
