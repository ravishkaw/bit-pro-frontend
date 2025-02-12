import {
  Layout,
  Button,
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Dropdown,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useHeaderTitleContext } from "../../../contexts/HeaderTitleContext";
import { avatarDropdownItems } from "./HeaderMenuItems";
import NotificationPopover from "../../Popover/NotificationPopover";

// Header component of the app
const AppHeader = ({ isMobile, collapsed, setCollapsed, setDrawerOpen }) => {
  const { headerTitle } = useHeaderTitleContext();

  const avatarItems = avatarDropdownItems();

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
          <Typography.Title
            level={isMobile ? 4 : 3}
            style={{ margin: 0, color: "#804d17" }}
          >
            {headerTitle}
          </Typography.Title>
        </Col>
        <Col>
          <Space size="large" align="center" wrap={false}>
            <NotificationPopover />
            <Dropdown menu={{ items: avatarItems }} placement="bottom" arrow>
              <Avatar style={avatarStyle} icon={<UserOutlined />} />
            </Dropdown>
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
  margin: "0 20px",
  top: 0,
  zIndex: 100,
  borderRadius: 8,
  boxShadow: "2px 2px 5px #d5c9bb",
};

const buttonStyle = {
  fontSize: "16px",
  width: 64,
  height: 64,
  borderRadius: 8,
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  margin: 0,
  cursor: "pointer",
};
