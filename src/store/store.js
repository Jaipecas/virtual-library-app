import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { virtualLibraryApi } from "../services/virtualLibraryApi";
import { studyRoomSlice } from "./slices/studyRoomSlice";

export const store = configureStore({
  reducer: {
    studyRoom: studyRoomSlice.reducer,
    [virtualLibraryApi.reducerPath]: virtualLibraryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(virtualLibraryApi.middleware),
});

setupListeners(store.dispatch);
