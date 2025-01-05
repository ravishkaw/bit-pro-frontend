import { Layout } from "antd";
import { useMobileContext } from "../../../contexts/MobileContext";
import SiderContent from "./SiderContent";

const AppSider = () => {
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
      <SiderContent />
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
