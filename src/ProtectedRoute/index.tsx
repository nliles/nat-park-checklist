import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { State } from "reducers/types";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
