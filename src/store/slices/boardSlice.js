import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
    error: null,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoard(state, action) {
            state.boards.push(action.payload);
        },
        setBoards(state, action) {
            state.boards = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setBoards, addBoard, setError } = boardSlice.actions;

