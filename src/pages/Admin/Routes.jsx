import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";

import AppLayout from "../../components/Layout/AppLayout";
import NotFound from "../Shared/NotFound";

import Dashboard from "./Dashboard";
import ManageEmployees from "./ManageEmployees";
import ManageUsers from "./ManageUsers";
import ManagePrivileges from "./ManagePrivileges";

// Routes that belong to the admin
const validAdminRoutes = [
  "/admin",
  "/admin/employees",
  "/admin/users",
  "/admin/privileges",
];

// Handle routing of Admin
const AdminRoutes = () => {
  const navigate = useNavigate();

  // Redirect to not found
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/admin") &&
      !validAdminRoutes.includes(currentPath)
    ) {
      navigate("/admin/notfound");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<ManageEmployees />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="privileges" element={<ManagePrivileges />} />

        <Route path="notfound" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
