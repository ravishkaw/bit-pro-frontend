import { Route, Routes } from "react-router";

// Public and Shared Routes
import Login from "../components/Auth/Login";
import Unauthorized from "../pages/Shared/Unauthorized";
import NotFound from "../pages/Shared/NotFound";

// Private Routes
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoutes from "./RoleBasedRoutes";

// Users Routes
import AdminRoutes from "../pages/Admin/Routes";
import ManagerRoutes from "../pages/Manager/Routes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Login />} />

      {/* Private Routes */}
      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <RoleBasedRoutes role="admin">
              <AdminRoutes />
            </RoleBasedRoutes>
          </PrivateRoute>
        }
      />

      {/* Manager */}
      <Route
        path="/manager/*"
        element={
          <PrivateRoute>
            <RoleBasedRoutes role="manager">
              <ManagerRoutes />
            </RoleBasedRoutes>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};
export default AppRoutes;
