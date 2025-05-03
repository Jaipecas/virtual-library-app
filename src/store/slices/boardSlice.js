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
        removeCard(state, action) {
            const list = state.selectedBoard.cardLists.find(list =>
                list.cards?.some(card => card.id === action.payload)
            );

            if (list) {
                list.cards = list.cards.filter(card => card.id !== action.payload);
            }
        },
        removeCardList(state, action) {
            const removedCardListId = action.payload;
            state.selectedBoard.cardLists = state.selectedBoard.cardLists.filter(cardList => cardList.id !== removedCardListId);
        },
        updateCard(state, action) {
            const updatedCard = action.payload;

            const list = state.selectedBoard.cardLists.find(list =>
                list.cards?.some(card => card.id === updatedCard.id)
            );

            if (list) {
                list.cards = list.cards.map(card =>
                    card.id === updatedCard.id ? { ...card, ...updatedCard } : card
                );
            }
        },
        updateBoard(state, action) {
            const updatedBoard = action.payload;

            state.selectedBoard.title = updatedBoard.title;

            const board = state.boards.find(board => board.id === updatedBoard.id);

            if (board) {
                board.title = updatedBoard.title;
            }
        },
        updateCardList(state, action) {
            const updatedCardList = action.payload;

            const cardList = state.selectedBoard.cardLists.find(cardList => cardList.id === updatedCardList.id);

            if (cardList) cardList.title = updatedCardList.title
        },
        moveCard(state, action) {
            const updatedCard = action.payload;

            console.log(updatedCard)
            const oldList = state.selectedBoard.cardLists.find(list =>
                list.cards?.some(card => card.id === updatedCard.id)
            );

            console.log(oldList);
            if (oldList) {
                oldList.cards = oldList.cards.filter(card => card.id !== updatedCard.id);
            }

            const newList = state.selectedBoard.cardLists.find(cardList => cardList.id === updatedCard.cardListId);
            console.log(newList)

            if (newList) newList.cards.push(updatedCard);
        },
        orderCard(state, action) {
            const updatedCard = action.payload;

            const list = state.selectedBoard.cardLists.find(list =>
                list.cards?.some(card => card.id === updatedCard.id)
            );

            if (list) {
                list.cards = list.cards.map(card =>
                    card.id === updatedCard.id ? { ...card, ...updatedCard } : card
                );
            }

            list.cards.sort((a, b) => a.order - b.order);

        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setBoards,
    setBoard,
    addBoard,
    addCard,
    addCardList,
    setError,
    removeBoard,
    removeCard,
    removeCardList,
    updateCard,
    updateBoard,
    updateCardList,
    moveCard,
    orderCard
} = boardSlice.actions;

