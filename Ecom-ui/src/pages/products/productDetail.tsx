import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/products/product.type";
import { productService } from "../../services/productService";
import { Button, Card, Dropdown, Popconfirm, Spin, Table, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ProductVariantEditModal from "./components/productVariantEditModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [productVariantId, setProductVariantId] = useState<number | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const navigate = useNavigate();

  const getProductDetail = async () => {
    if (id && !isNaN(Number(id))) {
      setLoading(true);

      try {
        const productDetail = await productService.getById(Number(id));
        setProduct(productDetail);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductDetail();
    };
    fetchData();
  }, [id]);
  const variantRows = useMemo(() => {
    if (!product) return [];

    return product.variants.map((v) => ({
      key: v.id,
      productName: product.name,
      description: product.description,
      category: product.category,
      ...v,
    }));
  }, [product]);
  if (loading) return <Spin />;

  if (!product) return <div>Product not found</div>;

  const handleBack = () => {
    window.history.back();
  };

  const handleHide = async (id: number) => {
    const response = await productService.updateProductVariantStatus(id);
    if (response.status == 200) {
      await getProductDetail();
      toast.success("Update successfully!");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await productService.deleteProductVariant(id);

      if (response.status === 200) {
        toast.success("Delete successfully!");
        if (product.variants.length === 1) navigate("/products");
        await getProductDetail();
      } else {
        navigate("/products");
      }
    } catch {
      navigate("/products");
    }
  };

  const handleUpdateProductVariant = async (values: unknown) => {
    const response = await productService.updateProductVariant(values);
    if (response.status === 200) {
      toast.success("Update successfully!");
      await getProductDetail();
      setIsOpenEditModal(false);
    } else {
      toast.error("Update failed!");
    }
  };
  return (
    <>
      {isOpenEditModal && Number(productVariantId) && (
        <ProductVariantEditModal
          id={productVariantId!}
          open={isOpenEditModal}
          onCancel={() => setIsOpenEditModal(false)}
          onSubmit={handleUpdateProductVariant}
        />
      )}
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <button
            onClick={handleBack}
            style={{
              marginBottom: 16,
              padding: "8px 14px",
              cursor: "pointer",
              backgroundColor: "#1677ff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              boxShadow: "0 2px 6px rgba(22, 119, 255, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            ← Back
          </button>
        </div>{" "}
        <Card>
          <Table
            dataSource={variantRows}
            pagination={false}
            columns={[
              {
                title: "Product",
                dataIndex: "productName",
                render: (productName, record) => (
                  <span
                    onClick={() => {
                      setProductVariantId((record as Product)?.id ?? null);
                      setIsOpenEditModal(true);
                    }}
                    style={{
                      color: "#1677ff",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {productName}
                  </span>
                ),
              },
              {
                title: "Category",
                dataIndex: "category",
                render: (cat: unknown) => {
                  const c = cat as { name: string };
                  return <span>{c?.name}</span>;
                },
              },
              {
                title: "Size",
                dataIndex: "size",
              },
              {
                title: "Color",
                dataIndex: "color",
                render: (color: string) => <Tag color="blue">{color}</Tag>,
              },
              {
                title: "Price",
                dataIndex: "price",
                render: (price: number) =>
                  new Intl.NumberFormat("vi-VN").format(price) + " VND",
              },
              {
                title: "Stock",
                dataIndex: "stockQuantity",
                render: (_: number, record: Product | unknown) => (
                  <span>{(record as Product)?.inventory?.stockQuantity}</span>
                ),
              },
              {
                title: "Remaining",
                dataIndex: "remainingQuantity",
                render: (_: number, record: Product | unknown) => (
                  <span>
                    {(record as Product)?.inventory?.remainingQuantity}
                  </span>
                ),
              },
              {
                title: "Status",
                dataIndex: "isSell",
                render: (isSell: boolean) =>
                  isSell ? (
                    <Tag color="green">Selling</Tag>
                  ) : (
                    <Tag color="red">Hidden</Tag>
                  ),
              },
              {
                title: "Actions",
                key: "actions",
                render: (_: unknown, record: unknown) => {
                  const id = (record as { id: number; isSell: boolean })?.id;
                  const isSell = (record as { id: number; isSell: boolean })
                    ?.isSell;
                  const items = [
                    {
                      key: "hide",
                      label: (
                        <Popconfirm
                          title={`Are you sure to ${isSell ? "hide" : "show"} this item?`}
                          onConfirm={() => handleHide(id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span style={{ color: "red" }}>
                            {isSell ? "Hide" : "Show"}
                          </span>
                        </Popconfirm>
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <Popconfirm
                          title="Are you sure to delete this item?"
                          onConfirm={() => handleDelete(id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <span style={{ color: "red" }}>Delete</span>
                        </Popconfirm>
                      ),
                    },
                  ];

                  return (
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  );
                },
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;
