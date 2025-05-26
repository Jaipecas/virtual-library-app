import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PublicRouter = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return !isAuthenticated ? children : <Navigate to={"/library"} />;
};
