import { Routes, Route } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="auth/*"
        element={
          <PublicRouter>
            <Routes>
              <Route path="login" element={<div>Login</div>} />
              <Route path="register" element={<div>Register</div>} />
            </Routes>
          </PublicRouter>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRouter>
            <Routes>
              <Route path="/" element={<div>Init Page</div>} />
            </Routes>
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
