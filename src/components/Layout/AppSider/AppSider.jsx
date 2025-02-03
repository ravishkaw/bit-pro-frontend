import { Button, Col, Layout, Row, Drawer, ConfigProvider } from "antd";
import { LogoutOutlined, MenuFoldOutlined } from "@ant-design/icons";

import SiderContent from "./SiderContent";
import companyLogo from "../../../assets/logo.png";

import { useAuth } from "../../../contexts/AuthContext";

const AppSider = ({ isMobile, collapsed, drawerOpen, setDrawerOpen }) => {
  const { logout } = useAuth();

  const siderContent = (
    <Row align="middle" justify="center" gutter={[0, 24]}>
      <Col span={24} style={{ textAlign: "center" }}>
        <img
          src={companyLogo}
          alt="Company Logo"
          style={{ height: "200px", width: "100%" }}
        />
      </Col>
      <Col span={24}>
        <SiderContent />
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <Button type="text" onClick={logout}>
          <LogoutOutlined style={{ fontSize: "1rem" }} />
          {!collapsed && "Log Out"}
        </Button>
      </Col>
    </Row>
  );

  return isMobile ? (
    <ConfigProvider theme={{ token: { paddingLG: 0 } }}>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(!drawerOpen)}
        open={drawerOpen}
        width={250}
        closable={false}>
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
      width={250}>
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
  scrollbarGutter: "stable",
};
