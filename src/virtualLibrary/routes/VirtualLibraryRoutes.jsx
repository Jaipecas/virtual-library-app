import { Routes, Route } from "react-router-dom";
import { ChatPage } from "../pages/chatPage";

export const VirtualLibraryRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};
