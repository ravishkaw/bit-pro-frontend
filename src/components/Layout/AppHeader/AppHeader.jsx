import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../../../contexts/context";

const AppHeader = () => {
  const { collapsed, setCollapsed } = useGlobalContext();
  
  return (
    <Layout.Header style={headerStyle}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "white",
        }}
      />
      Navbar
    </Layout.Header>
  );
};
export default AppHeader;

const headerStyle = {
  position: "sticky",
  padding: 0,
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  overflow: "auto",
  alignItems: "center",
};
