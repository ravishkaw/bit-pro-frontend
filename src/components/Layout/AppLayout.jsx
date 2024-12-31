import { ConfigProvider, Layout } from "antd";

import { colorPallete } from "../../constants/ColorPallete";

import AppSider from "./AppSider/AppSider";
import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <ConfigProvider theme={colorPallete}>
        <Layout
          hasSider
          style={{
            minHeight: "100vh",
          }}
        >
          <AppSider />
          <Layout>
            <AppHeader />
            <AppContent>
              <Outlet />
            </AppContent>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
export default AppLayout;
