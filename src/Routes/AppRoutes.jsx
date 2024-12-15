import React from "react";
import { Routes, Route } from "react-router";
import AppLayout from "../components/Layout/AppLayout";
import Home from "../Pages/Home";
import ManageGuest from "../Pages/Admin/ManageGuest";

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
