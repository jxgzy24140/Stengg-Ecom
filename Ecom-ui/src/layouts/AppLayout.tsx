import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      
      <Sider>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="products">
            <Link to="/products">Products</Link>
          </Menu.Item>

        </Menu>
      </Sider>

      {/* MAIN CONTENT */}
      <Layout>
        <Content style={{ padding: 20 }}>
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default AppLayout;