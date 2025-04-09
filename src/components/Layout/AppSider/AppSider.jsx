import { Button, Col, Layout, Row, Drawer, Flex, Typography } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

import { useThemeContext } from "../../../contexts/ThemeContext";

import SiderContent from "./SiderContent";

import blackLogo from "../../../assets/logo-black.png";
import whiteLogo from "../../../assets/logo-white.png";

// Main sider component - Uses sider for desktop and drawer for mobile
const AppSider = ({ isMobile, collapsed, drawerOpen, setDrawerOpen }) => {
  // Main sider content to render in sider and drawer

  const { isDarkMode } = useThemeContext();

  const siderContent = (
    <Row align="middle" justify="center" gutter={[0, 24]}>
      <Col
        span={24}
        style={{ textAlign: "center", height: "60px", marginTop: 8 }}
      >
        {collapsed ? (
          <img
            src={isDarkMode ? whiteLogo : blackLogo}
            alt="Company Logo"
            style={{ height: "auto", width: "3rem", marginTop: "2rem" }}
          />
        ) : (
          <>
            <img
              src={isDarkMode ? whiteLogo : blackLogo}
              alt="Company Logo"
              style={{ width: "5rem" }}
            />
            <Typography.Title level={4}>Villa Water Lilly</Typography.Title>
          </>
        )}
      </Col>
      <Col span={24}>
        <SiderContent />
      </Col>
    </Row>
  );

  // desktop - sider , mobile - drawer
  return isMobile ? (
    <Drawer
      placement="left"
      onClose={() => setDrawerOpen(!drawerOpen)}
      open={drawerOpen}
      width={250}
      closable={false}
      style={{ borderRadius: 8 }}
      styles={{ body: { padding: 0 } }}
    >
      <Button
        type="text"
        onClick={() => setDrawerOpen(!drawerOpen)}
        style={{ position: "absolute", top: 16, right: 0, zIndex: 1000 }}
      >
        <MenuFoldOutlined />
      </Button>
      {siderContent}
    </Drawer>
  ) : (
    <Layout.Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={280}
      theme="light"
    >
      {siderContent}
    </Layout.Sider>
  );
};

export default AppSider;

const siderStyle = {
  height: "100vh",
  position: "sticky",
  top: 0,
  bottom: 0,
  overflow: "auto",
  scrollbarWidth: "thin",
};
