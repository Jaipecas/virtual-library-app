import { configureStore } from "@reduxjs/toolkit";
import { studyRoomSlice } from "./slices/studyRoomSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    studyRoom: studyRoomSlice.reducer,
    user: userSlice.reducer,
  },
});

