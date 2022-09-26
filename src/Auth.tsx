import { useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { State } from "reducers/types";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: State) => state.auth.token);
  const { isExpired } = useJwt(token || "");

  useEffect(() => {
    if (isExpired) {
      localStorage.setItem("token", "");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token, isExpired]);

  return <>{children}</>;
};

export default AuthProvider;
