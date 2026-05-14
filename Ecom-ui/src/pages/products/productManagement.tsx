import React, { useEffect, useState } from "react";
import columns from "./columns";
import { Table, Spin } from "antd";
import { productService } from "../../services/productService";
import { useDebounce } from "../../hooks/useDebounce";
import ProductManagementHeader from "./components/productManagementHeader";
import type { Product } from "../../types/products/product.type";
import type { CreateOrUpdateProduct } from "../../types/products/createOrUpdateProduct.type";
import type { ColumnsType } from "antd/es/table";
import ProductDetailModal from "./components/productDetailModal";
import ProductModal from "./components/productModal";
import type { PagedFilterProductDto } from "../../types/products/PagedFilterProductDto";
import toast from "react-hot-toast";

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState<string>("");
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);

  const debouncedKeyword = useDebounce(keyword, 500);
  const params: PagedFilterProductDto = {
    keyword: debouncedKeyword,
    categoryId: categoryId,
    maxResultCount: 10,
    skipCount: 0,
    isDeleted: false,
  };

  const handleOpenAddModal = (isOpen: boolean) => {
    setIsOpenAddModal(isOpen);
  };

  const handleAddproduct = async (values: CreateOrUpdateProduct) => {
    // TODO: Implement product creation logic
    values.id = null;
    const response = await productService.create(values);
    if (response) {
      await fetchProductsAsync();
      toast.success("Create successfully!");
      setIsOpenAddModal(false);
    } else
      toast.error("Create failed!");
  };

  const handleUpdateProduct = async (values: CreateOrUpdateProduct) => {
    
    try {
      const response = await productService.update(values);
      if (response.status === 200) {
        await fetchProductsAsync();
        toast.success("Update successfully!");
      } else
        toast.error("Update failed!");
    } finally {
      setIsOpenProductModal(false);
    }
  };

  const fetchProductsAsync = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll(params);
      setProducts(response?.items || []);
      setTotal(response?.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductsAsync();
    };
    fetchData();
  }, [debouncedKeyword, categoryId]);

  const getColumns = (): ColumnsType<unknown> => {
    return columns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (id: number) => (
            <span
              onClick={() => {
                setProductId(id);
                setIsOpenProductModal(true);
              }}
              style={{
                color: "#1677ff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {id}
            </span>
          ),
        };
      }

      return col;
    });
  };

  return (
    <>
      {isOpenProductModal ? (
        <ProductModal
          id={productId}
          open={isOpenProductModal}
          onCancel={() => setIsOpenProductModal(false)}
          onSubmit={handleUpdateProduct}
        />
      ) : null}

      {isOpenAddModal ? (
        <ProductDetailModal
          open={isOpenAddModal}
          onCancel={() => handleOpenAddModal(false)}
          onSubmit={handleAddproduct}
        />
      ) : null}
      <ProductManagementHeader
        onSearch={(value: string) => setKeyword(value)}
        onAdd={handleOpenAddModal}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        onReload={fetchProductsAsync}
      />
      <Spin spinning={loading}>
        <Table
          dataSource={products}
          columns={getColumns()}
          pagination={{ total, pageSize: params.maxResultCount }}
          rowKey="id"
        />
      </Spin>
    </>
  );
};

export default ProductManagement;
