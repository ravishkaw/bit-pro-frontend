import { ConfigProvider, Layout } from "antd";

import { colorPallete } from "../../constants/ColorPallete";

import AppSider from "./AppSider/AppSider";
import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";
import { Outlet } from "react-router";
import { useMobileContext } from "../../contexts/MobileContext";

const AppLayout = () => {
  const { collapsed, setCollapsed, isMobile, drawerOpen, setDrawerOpen } =
    useMobileContext();

  return (
    <>
      <ConfigProvider theme={colorPallete}>
        <Layout
          hasSider
          style={{
            minHeight: "100vh",
          }}>
          <AppSider
            isMobile={isMobile}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
          <Layout>
            <AppHeader
              isMobile={isMobile}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              setDrawerOpen={setDrawerOpen}
            />
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
