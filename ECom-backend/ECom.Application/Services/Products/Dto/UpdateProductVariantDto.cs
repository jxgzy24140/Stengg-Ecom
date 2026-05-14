using System.ComponentModel.DataAnnotations;

namespace ECom.Application.Services.Products.Dto
{
    public class UpdateProductVariantDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(512)]
        public string Name { get; set; } = null!;

        [Required]
        public int CategoryId { get; set; }

        [StringLength(32)]
        public string Size { get; set; } = null!;
        [StringLength(32)]
        public string Color { get; set; } = null!;
        public decimal Price { get; set; } // Decimal 18,2
        public int StockQuantity { get; set; }
        public int RemainingQuantity { get; set; }
        public bool IsSell { get; set; }
        [Required]
        public byte[] RowVersion { get; set; }
    }
}
