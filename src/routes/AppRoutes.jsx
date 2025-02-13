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

// Handle all the routes of the app
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Login />} />

      {/* Private Routes to check logged in or note */}
      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            {/* routes based on the roles */}
            <RoleBasedRoutes role="role_admin">
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
            <RoleBasedRoutes role="role_manager">
              <ManagerRoutes />
            </RoleBasedRoutes>
          </PrivateRoute>
        }
      />

      {/* Any other not matching one  */}
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};
export default AppRoutes;
