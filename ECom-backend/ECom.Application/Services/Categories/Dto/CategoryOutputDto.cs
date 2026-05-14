using System.ComponentModel.DataAnnotations;

namespace ECom.Application.Services.Categories.Dto
{
    public class CategoryOutputDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(512)]
        public string Name { get; set; }
        public string Description { get; set; } = null!;
    }
}
