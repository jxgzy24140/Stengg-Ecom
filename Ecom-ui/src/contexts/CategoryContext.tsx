import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Category } from "../types/products/category.type";
import { categoryService } from "../services/categoryService";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  selectedCategoryId?: number;
  setSelectedCategoryId: (id?: number) => void;
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// CategoryContext Provider Component
export const CategoryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getList();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const value: CategoryContextType = {
    categories,
    loading,
    selectedCategoryId,
    setSelectedCategoryId,
    fetchCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to use CategoryContext
export const useCategoryContext = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategoryContext must be used within CategoryContextProvider");
  }
  return context;
};
