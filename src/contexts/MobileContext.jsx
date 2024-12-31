import { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext();

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [collapsed, setCollapsed] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setCollapsed(isMobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MobileContext.Provider
      value={{ isMobile, setIsMobile, collapsed, setCollapsed }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export const useMobileContext = () => useContext(MobileContext);
