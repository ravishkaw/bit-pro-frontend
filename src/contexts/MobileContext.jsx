import { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext();

// set the mobile context when screen resizing. main breakpoint is 768px
export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (isMobileView) {
        setCollapsed(false);
        setDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MobileContext.Provider
      value={{
        isMobile,
        setIsMobile,
        collapsed,
        setCollapsed,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export const useMobileContext = () => useContext(MobileContext);
