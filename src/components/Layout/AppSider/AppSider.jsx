import { Button, Col, Layout, Row } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import SiderContent from "./SiderContent";
import companyLogo from "../../../assets/logo.png";

import { useMobileContext } from "../../../contexts/MobileContext";
import { useAuth } from "../../../contexts/AuthContext";

const AppSider = () => {
  const { logout } = useAuth();
  const { collapsed } = useMobileContext();

  return (
    <Layout.Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
      width={250}
    >
      <Row justify="center" align="middle" gutter={[0, 24]}>
        <Col span={24}>
          <img
            src={companyLogo}
            alt="Company Logo"
            style={{ height: "200px", width: "100%" }}
          />
        </Col>
        <Col span={24}>
          <SiderContent />
        </Col>
        <Col>
          <Button type="text" onClick={logout} aria-label="Log out">
            <LogoutOutlined style={{ fontSize: "1.5rem" }} /> Log Out
          </Button>
        </Col>
      </Row>
    </Layout.Sider>
  );
};

export default AppSider;

const siderStyle = {
  overflow: "hidden",
  height: "100vh",
  position: "sticky",
  top: 0,
  bottom: 0,
  paddingTop: "2rem",
  // scrollbarGutter: "stable",
};
