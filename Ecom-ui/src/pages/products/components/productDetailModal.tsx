import { Modal, Form, Input, InputNumber, Switch, Select } from "antd";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import type { Category } from "../../../types/products/category.type";
import type { CreateOrUpdateProduct } from "../../../types/products/createOrUpdateProduct.type";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateOrUpdateProduct) => void;
}

const ProductDetailModal: React.FC<Props> = ({ open, onCancel, onSubmit }) => {
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

  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        {/* Name */}

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Product name" />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
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

        {/* Stock Quantity */}
        <Form.Item
          label="Stock Quantity"
          name="stockQuantity"
          initialValue={0}
          rules={[{ required: true, message: "Stock quantity is required" }]}
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

export default ProductDetailModal;
