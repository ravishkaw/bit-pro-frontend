import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login from "../components/Auth/Login";

import Unauthorized from "../pages/Shared/Unauthorized";
import NotFound from "../pages/Shared/NotFound";
import ServerError from "../pages/Shared/ServerError";

import { protectedRoutes } from "./routeConfig";

import PrivateRoute from "./PrivateRoute";
import ModuleAccess from "./ModuleAccess";
import AppLayout from "../components/Layout/AppLayout";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";

const AppRoutes = () => {
  const { loading } = useAuth();
  //Renders a protected routes with privilege checking
  const renderProtectedRoute = ({
    path, //Route path
    element: Element, //Component to render
    module, // Module name for access check
  }) => (
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

  if (loading) {
    return <Spin fullscreen size="large" percent="auto" />;
  }

  return (
    <Router>
      <Routes>
        {/* Public route - Login page */}
        <Route index element={<Login />} />

        {/* Protected routes wrapper with app layout */}
        <Route path="/" element={<AppLayout />}>
          {/* Generate all protected routes from config */}
          {protectedRoutes.map(renderProtectedRoute)}
        </Route>

        {/* Unauthorized , NotFound and server error routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
