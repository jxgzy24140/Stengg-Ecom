using System.ComponentModel.DataAnnotations.Schema;

namespace ECom.Domain.Entities
{
    [Table("ProductInventories")]
    public class ProductInventory
    {
        public int Id { get; set; }

        public int ProductVariantId { get; set; }

        public int StockQuantity { get; set; }
        public int RemainingQuantity { get; set; }

        public bool IsDeleted { get; set; } = false;

        // Navigation
        public ProductVariant ProductVariant { get; set; } = null!;
    }
}
