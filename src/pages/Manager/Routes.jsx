import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";

import AppLayout from "../../components/Layout/AppLayout";
import Dashboard from "./Dashboard";

const validAdminRoutes = ["/manager"];

const ManagerRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/manager") &&
      !validAdminRoutes.includes(currentPath)
    ) {
      navigate("/manager");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
export default ManagerRoutes;
