import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";

import AppLayout from "../../components/Layout/AppLayout";
import NotFound from "../Shared/NotFound";

import Dashboard from "./Dashboard";
import ManageEmployees from "./ManageEmployees";
import ManageUsers from "./ManageUsers";

// Routes that belong to the admin
const validAdminRoutes = [
  "/admin",
  "/admin/manage-employees",
  "/admin/manage-users",
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
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="manage-users" element={<ManageUsers />} />

        <Route path="notfound" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
