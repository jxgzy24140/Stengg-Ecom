using AutoMapper;
using ECom.Application.Interfaces;
using ECom.Application.Services.Products.Dto;
using ECom.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECom.Application.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product, int> _productRepository;
        private readonly IRepository<ProductVariant, int> _productVariantRepository;
        private readonly IMapper _mapper;

        public ProductService(
            IRepository<Product, int> productRepository,
            IRepository<ProductVariant, int> productVariantRepository,
            IMapper mapper)
        {
            _productRepository = productRepository;
            _productVariantRepository = productVariantRepository;
            _mapper = mapper;
        }

        public async Task<PagedResultOutputDto<ProductOutputDto>> GetAllAsync(PagedFilterProductDto input)
        {
            var query = _productRepository.GetAll()
                .Include(x => x.Category)
                .Include(x => x.Variants)
                .Where(x => !x.IsDeleted)
                ;

            if (!string.IsNullOrEmpty(input.Keyword))
                query = query.Where(x =>
                    x.Name.Contains(input.Keyword) ||
                    x.Description!.Contains(input.Keyword));

            if (input.CategoryId.HasValue)
                query = query.Where(p => p.CategoryId == input.CategoryId.Value);

            var totalCount = await query.CountAsync();

            var entities = await query
                .OrderByDescending(p => p.CreationTime)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            return new PagedResultOutputDto<ProductOutputDto>
            {
                TotalCount = totalCount,
                Items = _mapper.Map<List<ProductOutputDto>>(entities)
            };
        }

        public async Task<ProductOutputDto> GetAsync(int id)
        {
            var query = _productRepository.GetAll();

            var entity = await query
                .Include(x => x.Category)
                .Include(x => x.Variants).ThenInclude(v => v.Inventory)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

            if (entity == null)
                throw new Exception("EntityNotFound");

            entity.Variants = entity.Variants.Where(v => !v.IsDeleted).ToList();

            return _mapper.Map<ProductOutputDto>(entity); ;
        }

        public async Task<ProductVariantOutputDto> GetProductVariantAsync(int id)
        {
            var query = _productVariantRepository.GetAll();

            var entity = await query
                .Include(x => x.Product)
                .Include(x => x.Inventory)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

            if (entity == null)
                throw new Exception("EntityNotFound");

            return _mapper.Map<ProductVariantOutputDto>(entity); ;
        }

        public async Task<ProductOutputDto> CreateAsync(CreateProductDto input)
        {
            ValidateCreate(input);

            var product = await _productRepository
                .GetAll()
                .Include(x => x.Variants)
                .ThenInclude(v => v.Inventory)
                .FirstOrDefaultAsync(x =>
                    x.Name == input.Name &&
                    x.CategoryId == input.CategoryId
                    && !x.IsDeleted);

            if (product == null)
            {
                product = new Product
                {
                    Name = input.Name,
                    CategoryId = input.CategoryId,
                    Description = input.Description,
                    Variants = new List<ProductVariant>()
                };
            }

            var variant = new ProductVariant
            {
                Size = input.Size,
                Color = input.Color,
                Price = input.Price,
                IsSell = input.IsSell,
                Inventory = new ProductInventory
                {
                    StockQuantity = input.StockQuantity,
                    RemainingQuantity = input.StockQuantity
                }
            };

            product.Variants.Add(variant);

            if (product.Id == 0)
            {
                await _productRepository.CreateAsync(product);
            }
            else
            {
                await _productRepository.UpdateAsync(product);
            }

            return _mapper.Map<ProductOutputDto>(product);
        }

        public async Task<ProductOutputDto> UpdateAsync(UpdateProductDto input)
        {
            await ValidateUpdateAsync(input);

            var product = await _productRepository
                .GetAll()
                .Include(p => p.Variants)
                    .ThenInclude(v => v.Inventory)
                .FirstOrDefaultAsync(p => p.Id == input.Id);

            if (product == null)
                throw new Exception("EntityNotFound");

            product.Name = input.Name;
            product.Description = input.Description;
            product.CategoryId = input.CategoryId;
            product.LastModificationTime = DateTime.UtcNow;

            await _productRepository.UpdateAsync(product);

            return _mapper.Map<ProductOutputDto>(product);
        }

        public async Task<ProductVariantOutputDto> UpdateProductVariantAsync(UpdateProductVariantDto input)
        {
            if (input.RowVersion == null || input.RowVersion.Length == 0)
                throw new Exception("RowVersionRequired");

            var entity = await _productVariantRepository
                .GetAll()
                .Include(x => x.Product)
                .Include(x => x.Inventory)
                .FirstOrDefaultAsync(x => x.Id == input.Id && !x.IsDeleted);

            if (entity == null)
                throw new Exception("EntityNotFound");

            entity.Size = input.Size;
            entity.Color = input.Color;
            entity.Price = input.Price;
            entity.IsSell = input.IsSell;
            entity.Price = input.Price;
            entity.LastModificationTime = DateTime.UtcNow;

            if (entity?.Inventory != null)
            {
                entity.Inventory.StockQuantity = input.StockQuantity;
                entity.Inventory.RemainingQuantity = input.RemainingQuantity;
            }    
            await _productVariantRepository.UpdateAsync(entity, input.RowVersion);
            return _mapper.Map<ProductVariantOutputDto>(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _productRepository
                .GetAll()
                .Include(x => x.Variants)
                    .ThenInclude(v => v.Inventory)
                .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

            if (entity == null)
                throw new Exception("EntityNotFound");

            var now = DateTime.UtcNow;

            entity.IsDeleted = true;
            entity.DeletionTime = now;
            entity.DeleterUserId = 1;

            foreach (var variant in entity.Variants)
            {
                variant.IsDeleted = true;
                variant.DeletionTime = now;
                variant.DeleterUserId = 1;

                if (variant.Inventory != null)
                {
                    variant.Inventory.IsDeleted = true;
                }
            }

            await _productRepository.UpdateAsync(entity);
        }

        public async Task DeleteProductVariantAsync(int id)
        {
            var entity = await _productVariantRepository
                .GetAll()
                .Include(x => x.Product)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (entity == null)
                throw new Exception("EntityNotFound");

            entity.IsDeleted = true;
            entity.DeletionTime = DateTime.UtcNow;
            entity.DeleterUserId = 1;

            await _productVariantRepository.UpdateAsync(entity);

            if (await _productVariantRepository.GetAll().CountAsync(x => x.ProductId == entity.ProductId && !x.IsDeleted) == 0)
            {
                var product = entity.Product;
                product.IsDeleted = true;
                product.DeletionTime = DateTime.UtcNow;
                product.DeleterUserId = 1;
                await _productRepository.UpdateAsync(product);
            }
        }

        public async Task UpdateProductVariantStatusAsync(int id)
        {
            var entity = await _productVariantRepository
                .GetAll()
                .FirstOrDefaultAsync(p => p.Id == id);
            if (entity == null)
                throw new Exception("EntityNotFound");

            entity.IsSell = !entity.IsSell;
            await _productVariantRepository.UpdateAsync(entity);
        }

        #region Private API

        private void ValidateCreate(CreateProductDto input)
        {
            input.Name = input.Name.Trim();
        }

        private async Task ValidateUpdateAsync(UpdateProductDto input)
        {
            var exist = await _productRepository
                .GetAll()
                .AnyAsync(p => p.Id == input.Id && !p.IsDeleted);

            if (!exist)
                throw new Exception("ProductNotFound");

            if (input.RowVersion == null || input.RowVersion.Length == 0)
                throw new Exception("RowVersionRequired");
        }

        #endregion
    }
}
