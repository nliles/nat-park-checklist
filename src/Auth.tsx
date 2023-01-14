import { useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "actions";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = sessionStorage.getItem("token");
  const { isExpired } = useJwt(token || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && isExpired) {
      sessionStorage.removeItem("token");
      dispatch(logoutSuccess());
    }
  }, [token, isExpired]);

  return <>{children}</>;
};

export default AuthProvider;
