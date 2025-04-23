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
            const { cardListId, id, title } = action.payload;
            const cardList = state.selectedBoard.cardLists.find(c => c.id == cardListId);
            if (cardList) {
                if (!cardList.cards) cardList.cards = [];
                cardList.cards.push({ id, title });
            }
        },
        removeBoard(state, action) {
            state.boards = state.boards.filter(board => board.id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setBoards, setBoard, addBoard, addCard, addCardList, setError, removeBoard } = boardSlice.actions;

