import { createContext, useContext, useState , useEffect} from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
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
    <AppContext.Provider value={{ collapsed, setCollapsed, isMobile, setIsMobile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
