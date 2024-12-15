import React from "react";
import { Routes, Route } from "react-router";
import AppLayout from "../components/Layout/AppLayout";
import ManageGuest from "../pages/Admin/ManageGuest";
import Home from "../Pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/admin/manage-guests" element={<ManageGuest />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
