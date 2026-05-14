import { Modal, Form, Input, Select } from "antd";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import type { Category } from "../../../types/products/category.type";
import type { CreateOrUpdateProduct } from "../../../types/products/createOrUpdateProduct.type";
import { useEffect } from "react";
import { productService } from "../../../services/productService";

interface Props {
  id: number | null;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateOrUpdateProduct) => void;
}

const ProductModal: React.FC<Props> = ({ id, open, onCancel, onSubmit }) => {
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

  const getProductDetail = async () => {
    if (id && !isNaN(Number(id))) {
      const productDetail = await productService.getById(Number(id));
      form.setFieldsValue({
        id: productDetail.id,
        name: productDetail.name,
        description: productDetail.description,
        categoryId: productDetail.categoryId,
        rowVersion: productDetail.rowVersion,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductDetail();
    };
    fetchData();
  }, [id]);

  return (
    <Modal
      title="Update Product"
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
      </Form>
    </Modal>
  );
};

export default ProductModal;
