import { Button, Col, Layout, Row, Drawer, Flex, Typography } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

import { useThemeContext } from "../../../contexts/ThemeContext";

import SiderContent from "./SiderContent";

import blackLogo from "../../../assets/logo-black.png";
import whiteLogo from "../../../assets/logo-white.png";

// Main sider component - Uses sider for desktop and drawer for mobile
const AppSider = ({ isMobile, collapsed, drawerOpen, setDrawerOpen }) => {
  const { isDarkMode } = useThemeContext();

  // Fixed header for logo and title
  const headerStyle = {
    height: 150,
    paddingTop: 16,
    position: "sticky",
    top: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  // Main sider content to render in sider and drawer
  const siderContent = (
    <>
      <div style={headerStyle}>
        {collapsed ? (
          <img
            src={isDarkMode ? whiteLogo : blackLogo}
            alt="Company Logo"
            style={{ height: "auto", width: "3rem", marginTop: "1rem" }}
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
      </div>
      <div
        className={`sider-content-scroll${isDarkMode ? " dark" : ""}`}
        style={contentStyle}
      >
        <SiderContent />
      </div>
    </>
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
};

const contentStyle = {
  overflowY: "auto",
  maxHeight: "calc(100vh - 150px)",
  paddingTop: 16,
};
