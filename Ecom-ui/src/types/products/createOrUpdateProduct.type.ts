
export type CreateOrUpdateProduct = {
  id: number | null;
  categoryId: number;
  name: string;
  description?: string;
  size: string;
  color: string;
  price: number;
  isSell: boolean;
  rowVersion: string;
};