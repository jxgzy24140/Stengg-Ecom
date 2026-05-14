using System.ComponentModel.DataAnnotations;

namespace ECom.Application.Services.Products.Dto
{
    public class CreateProductDto
    {
        [Range(1, int.MaxValue)]
        [Required]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(512)]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        [StringLength(32)]
        public string Size { get; set; } = null!;
        [StringLength(32)]
        public string Color { get; set; } = null!;
        public decimal Price { get; set; } // Decimal 18,2

        public bool IsSell { get; set; } = false;
        public int StockQuantity { get; set; } = 0;
    }
}
