import { configureStore } from "@reduxjs/toolkit";
import { studyRoomSlice } from "./slices/studyRoomSlice";

export const store = configureStore({
  reducer: {
    studyRoom: studyRoomSlice.reducer,
  },
});

