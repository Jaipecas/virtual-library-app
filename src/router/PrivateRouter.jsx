import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

export const PrivateRouter = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return authState.isAuthenticated ? children : <Navigate to={"/library"}/>
};
