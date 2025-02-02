import { Routes, Route } from "react-router-dom";
import { InitialPage } from "../virtualLibrary/pages/InitialPage";
import { VirtualLibraryRoutes } from "../virtualLibrary/routes/VirtualLibraryRoutes";
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
            <VirtualLibraryRoutes />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
