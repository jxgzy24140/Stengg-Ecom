namespace ECom.Domain.Entities
{
    public abstract class FullAudittedEntity
    {
        public DateTime CreationTime { get; set; } = DateTime.UtcNow;
        public DateTime? LastModificationTime { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; } = false;

        public int? CreatorUserId { get; set; }
        public int? LastModifierUserId { get; set; }
        public int? DeleterUserId { get; set; }
    }
}
