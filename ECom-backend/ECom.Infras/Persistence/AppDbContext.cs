using ECom.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECom.Infras.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        public DbSet<ProductInventory> ProductInventories { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            modelBuilder.Entity<Product>(e =>
            {
                e.HasKey(p => p.Id);

                e.Property(p => p.RowVersion)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });
            modelBuilder.Entity<ProductVariant>(e => e.HasKey(p => p.Id));
            modelBuilder.Entity<ProductInventory>(e => e.HasKey(p => p.Id));
            modelBuilder.Entity<Category>(e => e.HasKey(p => p.Id));

            modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = 1,
                Name = "T-Shirts",
                Description = "Basic cotton t-shirts",
                CreationTime = DateTime.UtcNow,
                IsDeleted = false,
                CreatorUserId = 1
            },
            new Category
            {
                Id = 2,
                Name = "Shirts",
                Description = "Formal shirts",
                CreationTime = DateTime.UtcNow,
                IsDeleted = false,
                CreatorUserId = 1
            },
            new Category
            {
                Id = 3,
                Name = "Pants",
                Description = "Jeans and trousers",
                CreationTime = DateTime.UtcNow,
                IsDeleted = false,
                CreatorUserId = 1
            },
            new Category
            {
                Id = 4,
                Name = "Shoes",
                Description = "Footwear collection",
                CreationTime = DateTime.UtcNow,
                IsDeleted = false,
                CreatorUserId = 1
            },
            new Category
            {
                Id = 5,
                Name = "Accessories",
                Description = "Fashion accessories",
                CreationTime = DateTime.UtcNow,
                IsDeleted = false,
                CreatorUserId = 1
            }
        );

        }
    }
}
