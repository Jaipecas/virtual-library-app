import { Routes, Route } from "react-router-dom";
import { BoardPage } from "../pages/BoardPage";
import { RoomChatPage } from "../pages/RoomChatPage";
import { StudyRoomDashboard } from "../pages/StudyRoomDashboard";
import { UserPage } from "../pages/UserPage";

export const VirtualLibraryRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/studyroomdashboard" element={<StudyRoomDashboard />} />
        <Route path="/roomChatPage" element={<RoomChatPage />} />
        <Route path="/boards" element={<BoardPage />} />
      </Routes>
    </>
  );
};
