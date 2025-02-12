import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { colorPalette } from "./constants/ColorPalette";

const App = () => {
  return (
    <ConfigProvider theme={colorPalette}>
      <Router>
        <AppRoutes />
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          theme="colored"
          newestOnTop
        />
      </Router>
    </ConfigProvider>
  );
};
export default App;
