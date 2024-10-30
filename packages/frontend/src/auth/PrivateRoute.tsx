import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  Component: React.FC;
}

const PrivateRoute = ({ Component }: PrivateRouteProps) => {
  const isAuthenticated = false; // Replace with actual authentication check

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
