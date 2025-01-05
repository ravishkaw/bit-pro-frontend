import { Layout, Button, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { useMobileContext } from "../../../contexts/MobileContext";

const AppHeader = () => {
  const { logout } = useAuth();
  const { collapsed, setCollapsed } = useMobileContext();

  return (
    <Layout.Header style={headerStyle}>
      <Row justify="space-between" align="middle">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Col>
        <Col>
          <h3>Villa Water Lilly</h3>
        </Col>
        <Col>
          <Button type="primary" onClick={() => logout()}>
            Logout
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};
export default AppHeader;

const headerStyle = {
  position: "sticky",
  padding: "0 20px 0 0",
  top: 0,
  zIndex: 100,
  borderBottom: "2px solid #d4e3eb",
};
