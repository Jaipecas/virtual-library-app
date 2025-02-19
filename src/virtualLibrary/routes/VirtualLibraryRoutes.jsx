import { Routes, Route } from "react-router-dom";
import { ChatPage } from "../pages/chatPage";
import { UserPage } from "../pages/UserPage";

export const VirtualLibraryRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
};
