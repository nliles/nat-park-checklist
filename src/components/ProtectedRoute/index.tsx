import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { State } from "reducers/types";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/" replace />;
      </>
    )
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
