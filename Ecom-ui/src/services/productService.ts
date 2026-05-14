import axiosClient from "../api/axiosClient";
import type { PagedFilterProductDto } from "../types/products/PagedFilterProductDto";
import type { Product } from "../types/products/product.type";
import type { PagedFilterResultDto } from "../types/pagedFilterResultDto";
import type { ProductVariant } from "../types/products/productVariant.type";

export const productService = {
  // GET ALL (paged)
  getAll: async (params: PagedFilterProductDto) => {
    const response = await axiosClient.get<PagedFilterResultDto<Product>>(
      "/product/getAll",
      { params },
    );

    return response.data;
  },

  // GET BY ID
  getById: async (id: number) => {
    const response = await axiosClient.get<Product>(`/product/Get`, {
      params: { id },
    });

    return response.data;
  },

  getProductVariantById: async (id: number) => {
    const response = await axiosClient.get<ProductVariant>(
      `/product/GetProductVariant`,
      { params: { id } },
    );

    return response.data;
  },

  // CREATE
  create: async (data: unknown) => {
    const response = await axiosClient.post<Product>("/product/Create", data);

    return response.data;
  },

  // UPDATE
  update: async (data: unknown) => {
    const response = await axiosClient.put<Product>("/product/Update", data);

    return response;
  },
  updateProductVariant: async (data: unknown) => {
    const response = await axiosClient.put<Product>(
      "/product/UpdateProductVariant",
      data,
    );

    return response;
  },

  // DELETE
  delete: async (id: number) => {
    const response = await axiosClient.delete<void>(`/product/Delete`, {
      params: { id },
    });

    return response.data;
  },

  deleteProductVariant: async (id: number) => {
    return axiosClient.delete<void>("/product/DeleteProductVariant", {
      params: { id },
    });
  },

  updateProductVariantStatus: async (id: number) => {
    const response = await axiosClient.post(
      `/product/UpdateProductVariantStatus?id=${id}`,
    );

    return response;
  },
};
