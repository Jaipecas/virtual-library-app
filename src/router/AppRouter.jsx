import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Navbar } from "../virtualLibrary/components/Navbar";
import { InitialPage } from "../virtualLibrary/pages/InitialPage";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import {VirtualLibraryRoutes} from "../virtualLibrary/routes/VirtualLibraryRoutes"

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
        path="library/*"
        element={
          <>
            <Navbar />

            <PublicRouter>
              <Routes>
                <Route path="/" element={<InitialPage />} />
              </Routes>
            </PublicRouter>
            
            <PrivateRouter>
              <VirtualLibraryRoutes/>
            </PrivateRouter>
          </>
        }
      />
    </Routes>
  );
};
