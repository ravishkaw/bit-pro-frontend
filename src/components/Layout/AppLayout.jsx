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
            colorPrimary: "#8C7A6B",
            colorBgLayout: "#FDFBF7",
            colorText: "#4A4A4A",
            colorBorder: "#D9D0C7",
            fontFamily: "Roboto, sans-serif",
          },
          components: {
            Layout: {
              headerBg: "#E8E0D6",
              siderBg: "#8C7A6B",
              bodyBg: "#FDFBF7",
            },
            Button: {
              colorPrimary: "#8C7A6B",
              colorPrimaryHover: "#6F5D4C",
              algorithm: true,
            },
            Table: {
              headerBg: "#F3F1ED",
              rowBg: "#FFFFFF",
              rowBgHover: "#F8F5F0",
              borderColor: "#D9D0C7",
            },
            Card: {
              colorBg: "#FFFFFF",
              colorBorder: "#E0E0E0",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            },
            Modal: {
              colorBg: "#FFFFFF",
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
