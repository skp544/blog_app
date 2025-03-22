import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};
export default AdminRoute;
