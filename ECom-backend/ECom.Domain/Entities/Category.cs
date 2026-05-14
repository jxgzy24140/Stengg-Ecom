using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECom.Domain.Entities
{
    [Table("Categories")]
    public class Category : FullAudittedEntity
    {
        public int Id { get; set; }
        [Required]
        [StringLength(512)]
        public string Name { get; set; }
        public string Description { get; set; } = null!;
    }
}
