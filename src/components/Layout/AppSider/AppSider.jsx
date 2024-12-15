import { Layout } from "antd";

import { useGlobalContext } from "../../../contexts/context";

const AppSider = () => {
  const { collapsed } = useGlobalContext();
  return (
    <Layout.Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
    >
      AppSider
    </Layout.Sider>
  );
};
export default AppSider;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  top: 0,
  bottom: 0,
  scrollbarGutter: "stable",
  color: "#fff",
};
