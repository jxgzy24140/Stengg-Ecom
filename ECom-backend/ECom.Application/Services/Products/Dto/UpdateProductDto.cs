using System.ComponentModel.DataAnnotations;

namespace ECom.Application.Services.Products.Dto
{
    public class UpdateProductDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(512)]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [Required]
        public byte[] RowVersion { get; set; }
    }
}
