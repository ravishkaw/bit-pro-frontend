import { ConfigProvider, Layout } from "antd";

import AppSider from "./AppSider/AppSider";
import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3a86ff",
            colorBgLayout: "#f5f6fa",
            fontFamily: "Roboto",
          },
          components: {
            Layout: {
              headerBg: "#3a86ff",
              siderBg: "#0062ff",
              bodyBg: "#f5f6fa",
            },
          },
        }}
      >
        <Layout>
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
