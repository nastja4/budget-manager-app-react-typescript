import React, { FC } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, isLoggedIn }) => {
  return <>{isLoggedIn ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
