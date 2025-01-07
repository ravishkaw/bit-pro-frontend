import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
};
export default App;
