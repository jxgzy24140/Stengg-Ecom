const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (cat:unknown) => {
      const c = cat as { name: string };  
      return <span>{c?.name}</span>;
    }
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
    render: (_: unknown, record: unknown) => {
      const r = record as { id: number };

      return <a href={`/products/${r.id}`}>View Detail</a>;
    }
  }
];

export default columns;