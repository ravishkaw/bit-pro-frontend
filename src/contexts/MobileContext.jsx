import { createContext, useContext, useEffect, useState } from "react";

// Context to manage mobile-related states
const MobileContext = createContext();

// to handle mobile view logic
export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check if screen is mobile
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapsed state
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state

  useEffect(() => {
    // Update mobile state on window resize
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768; // Breakpoint for mobile
      setIsMobile(isMobileView);

      // Reset states for mobile view
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
