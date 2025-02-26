// Import dependencies
import { Route, Routes } from "react-router";
import Login from "../components/Auth/Login";
import Unauthorized from "../pages/Shared/Unauthorized";
import NotFound from "../pages/Shared/NotFound";
import PrivateRoute from "./PrivateRoute";
import ModuleAccess from "./ModuleAccess";
import AppLayout from "../components/Layout/AppLayout";
import { protectedRoutes } from "./routeConfig";

const AppRoutes = () => {
  //Renders a protected route with optional module access check
  //path - Route path | element - Component to render | module - Module name for access check
  const renderProtectedRoute = ({ path, element: Element, module }) => (
    <Route
      key={path}
      path={path}
      element={
        <PrivateRoute>
          {module ? (
            <ModuleAccess module={module}>
              <Element />
            </ModuleAccess>
          ) : (
            <Element />
          )}
        </PrivateRoute>
      }
    />
  );

  return (
    <Routes>
      {/* Public route - Login page */}
      <Route index element={<Login />} />

      {/* Protected routes wrapper with app layout */}
      <Route path="/" element={<AppLayout />}>
        {/* Generate all protected routes from config */}
        {protectedRoutes.map(renderProtectedRoute)}
      </Route>

      {/* Unauthorized and NotFound routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
