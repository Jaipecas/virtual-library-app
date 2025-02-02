import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { InitialPage } from "../pages/InitialPage";

export const VirtualLibraryRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InitialPage />} />
      </Routes>
    </>
  );
};
