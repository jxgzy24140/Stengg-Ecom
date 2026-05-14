import axiosClient from "../api/axiosClient";
import type { Category } from "../types/products/category.type";


export const categoryService = {
    getList: async () => {
    const response = await axiosClient.get<Category[]>(
      "/category/getList"
    );

    return response.data;
  },
}