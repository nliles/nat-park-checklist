import { Navigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { saveState } from "storage/sessionStorage";
import { State } from "reducers/types";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: State) => state.auth.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: State) => state.auth.token);
  const { isExpired } = useJwt(token || "");

  useEffect(() => {
    if (isExpired) {
      sessionStorage.removeItem("token");
    } else {
      saveState("token", token);
    }
  }, [token, isExpired]);

  return <>{children}</>;
};

export default AuthProvider;
