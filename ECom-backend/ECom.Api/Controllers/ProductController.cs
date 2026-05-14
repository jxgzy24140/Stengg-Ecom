using ECom.Application.Services.Products;
using ECom.Application.Services.Products.Dto;
using Microsoft.AspNetCore.Mvc;

namespace ECom.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpDelete("Delete")]
        public async Task DeleteAsync([FromQuery] int id)
        {
            await _productService.DeleteAsync(id);
        }

        [HttpDelete("DeleteProductVariant")]
        public async Task DeleteProductVariantAsync([FromQuery] int id)
        {
            await _productService.DeleteProductVariantAsync(id);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateAsync(CreateProductDto input)
        {
            var result = await _productService.CreateAsync(input);
            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateAsync(UpdateProductDto input)
        {
            var result = await _productService.UpdateAsync(input);
            return Ok(result);
        }
        [HttpPut("UpdateProductVariant")]
        public async Task<IActionResult> UpdateProductVariantAsync(UpdateProductVariantDto input)
        {
            var result = await _productService.UpdateProductVariantAsync(input);
            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllAsync([FromQuery] PagedFilterProductDto input)
        {
            var result = await _productService.GetAllAsync(input);
            return Ok(result);
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAsync([FromQuery] int id)
        {
            var result = await _productService.GetAsync(id);
            return Ok(result);
        }

        [HttpGet("GetProductVariant")]
        public async Task<IActionResult> GetProductVariantAsync([FromQuery] int id)
        {
            var result = await _productService.GetProductVariantAsync(id);
            return Ok(result);
        }

        [HttpPost("UpdateProductVariantStatus")]
        public async Task<IActionResult> UpdateProductVariantStatusAsync([FromQuery] int id)
        {
            await _productService.UpdateProductVariantStatusAsync(id);
            return Ok();
        }
    }
}
