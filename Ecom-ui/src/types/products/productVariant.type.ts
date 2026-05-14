import type { Product } from "./product.type";
import type { ProductInventory } from "./productInventory.type";

export type ProductVariant = {
  id: number;
  productId: number;

  size: string;
  color: string;
  price: number;
  isSell: boolean;
  rowVersion: string;
  inventory?: ProductInventory;
  product: Product;
};
