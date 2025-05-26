import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { boardSlice } from "./slices/boardSlice";
import { notificationSlice } from "./slices/notificationSlice";
import { studyRoomSlice } from "./slices/studyRoomSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    studyRoom: studyRoomSlice.reducer,
    user: userSlice.reducer,
    notifications: notificationSlice.reducer,
    auth: authSlice.reducer,
    board: boardSlice.reducer,
  },
});

