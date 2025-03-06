import {
  Button,
  Col,
  Layout,
  Row,
  Drawer,
  ConfigProvider,
  Flex,
  Typography,
} from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

import SiderContent from "./SiderContent";

import companyLogoCollapsed from "../../../assets/logoCollapsed.png";

// Main sider component - Uses sider for desktop and drawer for mobile
const AppSider = ({ isMobile, collapsed, drawerOpen, setDrawerOpen }) => {
  // Main sider content to render in sider and drawer
  const siderContent = (
    <Row align="middle" justify="center" gutter={[0, 24]}>
      <Col
        span={24}
        style={{ textAlign: "center", height: "60px", marginTop: 8 }}
      >
        {collapsed ? (
          <img
            src={companyLogoCollapsed}
            alt="Company Logo"
            style={{ height: "auto", width: "3rem" }}
          />
        ) : (
          <Flex justify="center" align="center" gap={8}>
            <img
              src={companyLogoCollapsed}
              alt="Company Logo"
              style={{ width: "3rem" }}
            />
            <Typography.Title level={3} style={{ margin: 0 }}>
              Villa Waterlilly
            </Typography.Title>
          </Flex>
        )}
      </Col>
      <Col span={24}>
        <SiderContent />
      </Col>
    </Row>
  );

  // desktop - sider , mobile - drawer
  return isMobile ? (
    // paddingLG removes drawer padding
    <ConfigProvider theme={{ token: { paddingLG: 0 } }}>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(!drawerOpen)}
        open={drawerOpen}
        width={250}
        closable={false}
        style={{ borderRadius: 8 }}
      >
        <Button
          type="text"
          icon={<MenuFoldOutlined />}
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
        />
        {siderContent}
      </Drawer>
    </ConfigProvider>
  ) : (
    <Layout.Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
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
