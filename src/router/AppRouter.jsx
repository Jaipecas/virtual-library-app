import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
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
            <AuthRoutes />
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
