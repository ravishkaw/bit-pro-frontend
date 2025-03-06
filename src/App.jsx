import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { lightTheme, darkTheme } from "./constants/ColorPalette";
import { useThemeContext } from "./contexts/ThemeContext";

const App = () => {
  const { isDarkMode } = useThemeContext();

  return (
    // color palette to manage the color of the app
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <AppRoutes />
        <ToastContainer newestOnTop />
      </Router>
    </ConfigProvider>
  );
};

export default App;
