import { Layout } from "antd";
import { Outlet } from "react-router";

import { useMobileContext } from "../../contexts/MobileContext";

import AppSider from "./AppSider/AppSider";
import AppHeader from "./AppHeader/AppHeader";
import AppContent from "./AppContent/AppContent";

// Layout of the full app ( Sider, Header, Content Area)
const AppLayout = () => {
  const { collapsed, setCollapsed, isMobile, drawerOpen, setDrawerOpen } =
    useMobileContext();

  return (
    <>
      <Layout
        hasSider
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Sider Area */}
        <AppSider
          isMobile={isMobile}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <Layout>
          {/* Header Area */}
          <AppHeader
            isMobile={isMobile}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setDrawerOpen={setDrawerOpen}
          />

          {/* Main content area */}
          <AppContent>
            <Outlet /> {/* outlet is to render children*/}
          </AppContent>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
