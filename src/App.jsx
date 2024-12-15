import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};
export default App;
