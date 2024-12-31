import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";

import AppLayout from "../../components/Layout/AppLayout";
import Dashboard from "./Dashboard";
import ManageEmployees from "./ManageEmployees";

const validAdminRoutes = ["/admin", "/admin/manage-employees"];

const AdminRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/admin") &&
      !validAdminRoutes.includes(currentPath)
    ) {
      navigate("/admin");
    }
  }, [navigate]);
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
