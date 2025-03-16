import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
export default PublicRoute;
