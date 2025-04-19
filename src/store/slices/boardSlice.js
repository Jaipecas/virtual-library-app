import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
    error: null,
};

export const boardSlice = createSlice({
    name: 'studyRoom',
    initialState,
    reducers: {
        addBoard(state, action) {
            state.boards.push(action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { addBoard, setError } = boardSlice.actions;

