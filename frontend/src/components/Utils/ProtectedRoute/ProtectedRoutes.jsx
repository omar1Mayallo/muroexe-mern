import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = ({auth, children}) => {
  if (auth === false) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
