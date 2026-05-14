using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECom.Domain.Entities
{
    [Table("ProductVariants")]
    public class ProductVariant : FullAudittedEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        [StringLength(32)]
        public string Size { get; set; } = null!;
        [StringLength(32)]
        public string Color { get; set; } = null!;
        public decimal Price { get; set; } // Decimal 18,2

        public bool IsSell { get; set; } = false;
        [Timestamp]
        public byte[] RowVersion { get; set; } = default!;
        public Product Product { get; set; } = null!;
        public ProductInventory Inventory { get; set; } = null!;
    }
}
