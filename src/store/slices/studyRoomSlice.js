import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studyRooms: [],
    loading: false,
    error: null,
};

export const studyRoomSlice = createSlice({
    name: 'studyRoom',
    initialState,
    reducers: {
        setStudyRooms(state, action) {
            state.studyRooms = action.payload;
        },
        addStudyRoom(state, action) {
            state.studyRooms.push(action.payload);
        },
        updateStudyRoom(state, action) {
            const index = state.studyRooms.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.studyRooms[index] = action.payload;
            }
        },
        removeStudyRoom(state, action) {
            state.studyRooms = state.studyRooms.filter(room => room.id !== action.payload);
        },
        setLoading(state) {
            state.loading = true;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setIdle(state) {
            state.loading = false;
        },
    },
});

export const { setStudyRooms, addStudyRoom, updateStudyRoom, removeStudyRoom, setLoading, setError, setIdle } = studyRoomSlice.actions;

