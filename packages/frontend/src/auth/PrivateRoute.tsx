import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

interface PrivateRouteProps {
  Component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const { user, loading } = useUserContext();

  if (loading) return <div>Loading...</div>;

  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
