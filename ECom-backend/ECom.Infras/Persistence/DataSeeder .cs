using ECom.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECom.Infras.Persistence
{
    public class DataSeeder : IDataSeeder
    {
        private readonly AppDbContext _db;

        public DataSeeder(AppDbContext db)
        {
            _db = db;
        }

        public async Task SeedAsync()
        {
            if (await _db.Categories.AnyAsync())
                return;

            _db.Categories.AddRange(
                new Category { Name = "Shirt", Description = "Basic shirt", IsDeleted = false },
                new Category { Name = "Shoes", Description = "Footwear", IsDeleted = false },
                new Category { Name = "Pants", Description = "Jeans", IsDeleted = false  } ,
                new Category { Name = "Jacket", Description = "Winter jacket", IsDeleted = false } ,
                new Category { Name = "Hat", Description = "Baseball cap", IsDeleted = false }
            );

            await _db.SaveChangesAsync();
        }
    }
}
