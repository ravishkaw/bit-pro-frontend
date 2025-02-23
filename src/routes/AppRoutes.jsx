import { Route, Routes } from "react-router";

// Public and Shared Routes
import Login from "../components/Auth/Login";
import Unauthorized from "../pages/Shared/Unauthorized";
import NotFound from "../pages/Shared/NotFound";

// Private Routes
import PrivateRoute from "./PrivateRoute";
import ModuleAccess from "./ModuleAccess";

// App layout
import AppLayout from "../components/Layout/AppLayout";

// Pages
import Dashboard from "../pages/Dashboard";
import ManageEmployee from "../pages/ManageEmployees";
import ManageUsers from "../pages/ManageUsers";
import ManagePrivileges from "../pages/ManagePrivileges";
import UserProfile from "../pages/UserProfile";
import ManageRooms from "../pages/ManageRooms";

// Handle all the routes of the app
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* Default route (index) that renders the Login component */}
      <Route index element={<Login />} />

      {/* AppLayout wraps all private routes */}
      <Route path="/" element={<AppLayout />}>
        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Manage Employee Route */}
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <ModuleAccess module="Employee">
                <ManageEmployee />
              </ModuleAccess>
            </PrivateRoute>
          }
        />

        {/* Manage Users Route */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <ModuleAccess module="User">
                <ManageUsers />
              </ModuleAccess>
            </PrivateRoute>
          }
        />

        {/* Manage Privileges Route */}
        <Route
          path="/privileges"
          element={
            <PrivateRoute>
              <ModuleAccess module="Privilege">
                <ManagePrivileges />
              </ModuleAccess>
            </PrivateRoute>
          }
        />

        {/* Manage Privileges Route */}
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <ModuleAccess module="Room">
                <ManageRooms />
              </ModuleAccess>
            </PrivateRoute>
          }
        />

        {/* User Profile Route */}
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<NotFound />} />

      {/* Route for unauthorized access */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
