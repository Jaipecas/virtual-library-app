import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyRooms: [],
};

export const studyRoomSlice = createSlice({
  name: "studyRoom",
  initialState,
  reducers: {
    addStudyRoom: (state, action) => {
      state.studyRooms = [...state.studyRooms, action.payload.studyRoom];
    },
  },
});

export const { startLoadingPokemons, addStudyRoom } = studyRoomSlice.actions;
