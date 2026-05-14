namespace ECom.Application.Services
{
    public class PagedResultOutputDto<T>
    {
        public int TotalCount { get; set; }
        public List<T> Items { get; set; } = new List<T>();
    }
}
