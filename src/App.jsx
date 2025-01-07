import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        autoClose={1500}
        newestOnTop
      />
    </Router>
  );
};
export default App;
