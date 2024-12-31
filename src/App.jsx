import { BrowserRouter as Router, Routes } from "react-router";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
export default App;
