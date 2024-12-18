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
            colorPrimary: "#A67B5B", 
            colorBgLayout: "#FDF8F4",
            colorText: "#5C3D2E", 
            colorBorder: "#E6D2C3", 
            fontFamily: "Merriweather, serif",
          },
          components: {
            Layout: {
              headerBg: "#e3cdbd",
              siderBg: "#A67B5B",
              bodyBg: "#FDF8F4",
            },
            Button: {
              colorPrimary: "#A67B5B",
              colorPrimaryHover: "#8D6344",
            },
            Table: {
              headerBg: "#F2E8E1",
              rowBg: "#FFFFFF",
              rowBgHover: "#F8ECE3",
              borderColor: "#E6D2C3",
            },
            Card: {
              colorBg: "#FFFFFF",
              colorBorder: "#E6D2C3",
            },
          },
        }}
      >
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
