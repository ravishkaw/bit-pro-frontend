import {
  Layout,
  Button,
  Row,
  Col,
  Badge,
  Avatar,
  Typography,
  Space,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../contexts/AuthContext";

const AppHeader = ({ isMobile, collapsed, setCollapsed, setDrawerOpen }) => {
  const { user } = useAuth();

  const toggleMenu = () =>
    isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed);

  return (
    <Layout.Header style={headerStyle}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Button
            type="text"
            icon={
              collapsed || isMobile ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={toggleMenu}
            style={buttonStyle}
          />
        </Col>
        <Col>
          <Space size="large" align="center" wrap={false}>
            <Badge count={5} size="small">
              <BellOutlined style={iconStyle} aria-label="Notifications" />
            </Badge>
            <Row align="middle" wrap={false}>
              <Avatar
                style={avatarStyle}
                src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                icon={<UserOutlined />}
              />
              <Typography.Text>Good morning, {user.name}</Typography.Text>
            </Row>
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

const buttonStyle = {
  fontSize: "16px",
  width: 64,
  height: 64,
};

const iconStyle = {
  fontSize: "1.25rem",
  lineHeight: "1.25rem",
  verticalAlign: "middle",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
};
