using AutoMapper;
using ECom.Application.Interfaces;
using ECom.Application.Services.Categories.Dto;
using ECom.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECom.Application.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category, int> _categoryRepository;

        public CategoryService(
            IRepository<Category, int> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryOutputDto>> GetListAsync()
        {
            var entities = await _categoryRepository.GetAll().Where(x => !x.IsDeleted).Select(x => new CategoryOutputDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToListAsync();
            return entities;
        }
    }
}
