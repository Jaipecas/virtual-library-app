import { Routes, Route } from "react-router-dom";
import { NotificationsPage } from "../pages/NotificationsPage";
import { StudyRoomDashboard } from "../pages/StudyRoomDashboard";
import { StudyRoomPage } from "../pages/StudyRoomPage";
import { UserPage } from "../pages/UserPage";

export const VirtualLibraryRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/studyroomdashboard" element={<StudyRoomDashboard />} />        
      </Routes>
    </>
  );
};
