import { ConfigProvider, theme } from "antd";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
// import { lightTheme, darkTheme } from "./constants/ColorPalette";
import { useThemeContext } from "./contexts/ThemeContext";

const App = () => {
  const { isDarkMode } = useThemeContext();

  return (
    // color palette to manage the color of the app
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#666cff",
          fontFamily: "Poppins, sans-serif",
        },
        components: {
          Layout: {
            headerBg: isDarkMode ? "000" : "fff",
            headerPadding: "0 20px",
          },
          Menu: {
            itemBg: "transparent",
            borderRadius: 8,
          },
          Tooltip: {
            colorBgSpotlight: "#666cff",
          },
          Switch: {
            colorPrimary: "#52c41a",
            colorPrimaryHover: "#95de64",
            colorBgContainer: "#ff0000",
          },
        },
      }}
    >
      <Router>
        <AppRoutes />
        <ToastContainer newestOnTop theme={isDarkMode ? "dark" : "light"} />
      </Router>
    </ConfigProvider>
  );
};

export default App;
