namespace ECom.Application.Services.Products.Dto
{
    public class ProductVariantOutputDto
    {
        public int Id { get; set; }

        public string Size { get; set; } = null!;
        public string Color { get; set; } = null!;
        public decimal Price { get; set; }

        public bool IsSell { get; set; }


        public ProductInventoryOutputDto Inventory { get; set; }
        public ProductOutputDto Product { get; set; }
        public byte[] RowVersion { get; set; } = default!;
    }
}
