import type { Category } from "./category.type";
import type { ProductInventory } from "./productInventory.type";
import type { ProductVariant } from "./productVariant.type";

export type Product = {
  id: number;
  uniqueId?: string;

  categoryId: number;
  category?: Category;

  name: string;
  description?: string;

  variants: ProductVariant[];
  inventory?: ProductInventory;
  rowVersion: string;
};