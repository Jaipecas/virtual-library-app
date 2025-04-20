import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
    selectedBoard: {},
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
        setBoard(state, action) {
            state.selectedBoard = action.payload;
        },
        addCardList(state, action) {
            state.selectedBoard.cardLists.push(action.payload);
        },
        addCard(state, action) {
            const cardList = state.selectedBoard.cardLists.find(c => c.id == action.payload.cardListId);
            if (cardList) cardList.push(action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setBoards, setBoard, addBoard, addCard, addCardList, setError } = boardSlice.actions;

