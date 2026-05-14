using AutoMapper;
using ECom.Application.Services.Categories.Dto;
using ECom.Application.Services.Products.Dto;
using ECom.Domain.Entities;

namespace ECom.Application.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductOutputDto>();

            CreateMap<ProductVariant, ProductVariantOutputDto>()
             ;

            CreateMap<Category, CategoryOutputDto>();
            CreateMap<ProductInventory, ProductInventoryOutputDto>();

        }
    }
}
