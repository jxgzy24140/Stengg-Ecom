using ECom.Application.Services.Categories.Dto;
using System.ComponentModel.DataAnnotations;

namespace ECom.Application.Services.Products.Dto
{
    public class ProductOutputDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public int CategoryId { get; set; }
        public CategoryOutputDto Category { get; set; }

        public List<ProductVariantOutputDto> Variants { get; set; } = new();
        public byte[] RowVersion { get; set; }
    }
}
