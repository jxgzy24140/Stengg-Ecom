using ECom.Application.Services.Categories.Dto;

namespace ECom.Application.Services.Categories
{
    public interface ICategoryService
    {
        Task<List<CategoryOutputDto>> GetListAsync();
    }
}
