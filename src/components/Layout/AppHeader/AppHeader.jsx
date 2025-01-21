import { Layout, Button, Row, Col, Badge, Avatar, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../../contexts/AuthContext";
import { useMobileContext } from "../../../contexts/MobileContext";

const AppHeader = () => {
  const { user } = useAuth();
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
        <Col></Col>
        <Col>
          <Space size="large" align="center">
            <Badge count={5} size="small">
              <BellOutlined
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1.25rem",
                  verticalAlign: "middle",
                }}
                aria-label="Notifications"
              />
            </Badge>
            <Space size="small" align="center">
              <Avatar
                style={{ width: "40px", height: "40px" }}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                icon={<UserOutlined />}
                alt="User Avatar"
              />
              <span>Good morning, {user.name}</span>
            </Space>
          </Space>
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
