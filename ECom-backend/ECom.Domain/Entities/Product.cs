using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECom.Domain.Entities
{
    [Table("Products")]
    public class Product : FullAudittedEntity
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }

        [Required]
        [StringLength(512)]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; } = default!;

        public Category Category { get; set; } = null!;
        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}
