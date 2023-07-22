import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LocalStorage } from "../../utils/Helper";

const PublicRoute = () => {
  let auth = LocalStorage();
  return Object.keys(auth).length === 0 ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/dashboard" }} />
  );
}

export default PublicRoute;
