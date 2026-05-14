import { Modal, Form, Input, InputNumber, Switch, Select } from "antd";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import type { Category } from "../../../types/products/category.type";
import type { CreateOrUpdateProduct } from "../../../types/products/createOrUpdateProduct.type";
import { productService } from "../../../services/productService";
import { useEffect } from "react";

interface Props {
  open: boolean;
  id: number;
  onCancel: () => void;
  onSubmit: (values: CreateOrUpdateProduct) => void;
}

const ProductVariantEditModal: React.FC<Props> = ({
  open,
  id,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const { categories, loading } = useCategoryContext();

  const categoryOptions = categories.map((category: Category) => ({
    label: category.name,
    value: category.id,
  }));

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
    form.resetFields();
  };

  const getProductVariantDetail = async () => {
    if (id && !isNaN(Number(id))) {
      const productVariant = await productService.getProductVariantById(
        Number(id),
      );
      if (productVariant) {
        form.setFieldsValue({
          id: productVariant.id,
          name: productVariant.product.name,
          description: productVariant.product.description,
          categoryId: productVariant.product.categoryId,
          size: productVariant.size,
          color: productVariant.color,
          price: productVariant.price,
          stockQuantity: productVariant.inventory?.stockQuantity,
          remainingQuantity: productVariant.inventory?.remainingQuantity,
          isSell: productVariant.isSell,
          rowVersion: productVariant.rowVersion,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductVariantDetail();
    };
    fetchData();
  }, [id]);

  return (
    <Modal
      title="Edit Product Variant"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText="Update"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Id"
          name="id"
          rules={[{ required: true, message: "Id is required" }]}
          style={{ display: "none" }}
        >
          <Input placeholder="Id" />
        </Form.Item>

        <Form.Item
          label="Row Version"
          name="rowVersion"
          rules={[{ required: true, message: "Row Version is required" }]}
          style={{ display: "none" }}
        >
          <Input placeholder="Row Version" />
        </Form.Item>

        {/* Name */}

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Product name" disabled={true} />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} disabled={true} />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select
            placeholder="Select category"
            options={categoryOptions}
            loading={loading}
            disabled={true}
          />
        </Form.Item>

        {/* Size */}
        <Form.Item
          label="Size"
          name="size"
          rules={[{ max: 32, message: "Size must be at most 32 characters" }]}
        >
          <Input placeholder="e.g. M, L, XL" maxLength={32} />
        </Form.Item>

        {/* Color */}
        <Form.Item
          label="Color"
          name="color"
          rules={[{ max: 32, message: "Color must be at most 32 characters" }]}
        >
          <Input placeholder="e.g. Red, Blue" maxLength={32} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber<number>
            style={{ width: "100%" }}
            min={0}
            precision={0}
            formatter={(value) =>
              value ? new Intl.NumberFormat("vi-VN").format(Number(value)) : ""
            }
            parser={(value) => {
              if (!value) return 0;
              return Number(value.replace(/\D/g, ""));
            }}
          />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stockQuantity"
          initialValue={0}
          rules={[{ required: true, message: "Stock quantity is required" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Remaining Quantity"
          name="remainingQuantity"
          initialValue={0}
          dependencies={["stockQuantity"]} // 👈 quan trọng
          rules={[
            { required: true, message: "Remaining quantity is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const stock = getFieldValue("stockQuantity");

                if (value === undefined || value === null)
                  return Promise.resolve();

                if (value <= stock) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Remaining quantity must be <= Stock quantity"),
                );
              },
            }),
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        {/* Is Sell */}
        <Form.Item
          label="Is Sell"
          name="isSell"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductVariantEditModal;
