import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studyRooms: [],
    invitedRooms: [],
    selectedRoom: null,
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
        setInvitedStudyRooms(state, action) {
            state.invitedRooms = action.payload;
        },
        setSelectedRoom(state, action) {
            state.selectedRoom = action.payload;
        },
        addStudyRoom(state, action) {
            state.studyRooms.push(action.payload);
        },
        updateRoom(state, action) {
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

export const { setStudyRooms, addStudyRoom, updateRoom, removeStudyRoom, setLoading, setError, setIdle, setInvitedStudyRooms, setSelectedRoom } = studyRoomSlice.actions;

