namespace ECom.Application.Services.Products.Dto
{
    public class PagedFilterProductDto
    {
        public string? Keyword { get; set; }
        public int? CategoryId { get; set; }
        public int MaxResultCount { get; set; } = 10;
        public int SkipCount { get; set; } = 0;
        public bool IsDeleted = false;
    }
}
