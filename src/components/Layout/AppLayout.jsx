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
            colorPrimary: "#4A4A4A",
            colorBgLayout: "#F9F9F9",
            colorText: "#333333",
            colorBorder: "#E0E0E0",
            fontFamily: "Roboto",
          },
          components: {
            Layout: {
              headerBg: "#FFFFFF",
              siderBg: "#4A4A4A",
              bodyBg: "#F9F9F9",
            },
            Button: {
              // colorPrimary: "#1BA1E2",
              algorithm: true,
            },
            Table: {
              headerBg: "#F3F3F3",
              rowBg: "#FFFFFF",
              rowBgHover: "#F1F1F1",
              borderColor: "#E0E0E0",
            },
            Input: {
              colorBg: "#FFFFFF",
              colorBorder: "#E0E0E0",
              colorPlaceholder: "#999999",
            },
            Card: {
              colorBg: "#FFFFFF",
              colorBorder: "#E0E0E0",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            },
            Modal: {
              colorBg: "#FFFFFF",
              headerBg: "#F3F3F3",
              footerBg: "#FFFFFF",
            },
            Tooltip: {
              colorBg: "#333333",
              colorText: "#FFFFFF",
            },
            Menu: {
              colorBg: "#FFFFFF",
              colorText: "#4A4A4A",
              colorTextHover: "#1BA1E2",
              colorBgHover: "#F3F3F3",
              algorithm: true,
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
