import { Button, Input, Select } from "antd";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import type { Category } from "../../../types/products/category.type";
import { ReloadOutlined } from "@ant-design/icons";

const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
  onAdd: (value: boolean) => void;
  categoryId?: number;
  onCategoryChange?: (id?: number) => void;
  onReload: () => void;
}

const ProductManagementHeader: React.FC<Props> = ({
  onSearch,
  onAdd,
  categoryId,
  onCategoryChange,
  onReload,
}) => {
  const { categories, loading } = useCategoryContext();

  const categoryOptions = [
    { label: "All categories", value: undefined },
    ...categories.map((cat: Category) => ({ label: cat.name, value: cat.id })),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <Search
          placeholder="Search product..."
          onSearch={onSearch}
          allowClear
          style={{ width: 300 }}
        />
        <Select
          style={{ width: 200 }}
          options={categoryOptions}
          value={categoryId}
          loading={loading}
          onChange={onCategoryChange}
          placeholder="Filter by category"
          allowClear
        />
        <Button icon={<ReloadOutlined />} onClick={onReload} loading={loading}>
          Reload
        </Button>
      </div>
      <Button type="primary" onClick={() => onAdd(true)}>
        Add Product
      </Button>
    </div>
  );
};

export default ProductManagementHeader;
