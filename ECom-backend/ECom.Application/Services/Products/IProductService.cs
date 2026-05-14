using ECom.Application.Services.Products.Dto;

namespace ECom.Application.Services.Products
{
    public interface IProductService
    {
        Task<PagedResultOutputDto<ProductOutputDto>> GetAllAsync(PagedFilterProductDto input);
        Task<ProductOutputDto> CreateAsync(CreateProductDto input);
        Task<ProductOutputDto> UpdateAsync(UpdateProductDto input);
        Task DeleteAsync(int id);
        Task DeleteProductVariantAsync(int id);
        Task<ProductOutputDto> GetAsync(int id);
        Task UpdateProductVariantStatusAsync(int id);
        Task<ProductVariantOutputDto> UpdateProductVariantAsync(UpdateProductVariantDto input);
        Task<ProductVariantOutputDto> GetProductVariantAsync(int id);
    }
}
