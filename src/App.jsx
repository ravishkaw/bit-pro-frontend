import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { colorPalette } from "./constants/ColorPalette";

const App = () => {
  return (
    // color palette to manage the color of the app
    <ConfigProvider theme={colorPalette}>
      <Router>
        <AppRoutes />
        <ToastContainer newestOnTop />
      </Router>
    </ConfigProvider>
  );
};

export default App;