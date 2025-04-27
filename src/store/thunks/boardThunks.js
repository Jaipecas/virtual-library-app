import { BoardRoutes } from "../../services/apiRoutes";
import { apiDelete, apiGet, apiPost, apiPut } from "../../services/apiService";
import { addBoard, addCard, addCardList, removeBoard, removeCard, removeCardList, setBoard, setBoards, setError, updateBoard, updateCard, updateCardList } from "../slices/boardSlice"

export const addBoardThunk = (boardData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const board = await apiPost(BoardRoutes.board, boardData);

        dispatch(addBoard(board));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const getBoardsThunk = (userId) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const boards = await apiGet(`${BoardRoutes.board}?userId=${userId}`);
        dispatch(setBoards(boards));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const getBoardThunk = (boardId) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const board = await apiGet(`${BoardRoutes.board}/${boardId}`);
        dispatch(setBoard(board));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const addCardThunk = (cardData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const card = await apiPost(BoardRoutes.card, cardData);

        dispatch(addCard(card));
    } catch (error) {
        dispatch(setError(error.message));
    }
}


export const addCardListThunk = (cardListData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const cardList = await apiPost(BoardRoutes.cardList, cardListData);

        dispatch(addCardList(cardList));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const removeBoardThunk = (boardId) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiDelete(`${BoardRoutes.board}?Id=${boardId}`);

        dispatch(removeBoard(boardId));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const removeCardThunk = (cardId) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiDelete(`${BoardRoutes.card}?Id=${cardId}`);

        dispatch(removeCard(cardId));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const removeCardListThunk = (cardListId) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiDelete(`${BoardRoutes.cardList}?Id=${cardListId}`);

        dispatch(removeCardList(cardListId));
    } catch (error) {
        dispatch(setError(error.message));
    }
}


export const updateCardThunk = (cardData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiPut(`${BoardRoutes.card}`, cardData);

        dispatch(updateCard(cardData));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const updateBoardThunk = (boardData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiPut(`${BoardRoutes.board}`, boardData);

        dispatch(updateBoard(boardData));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const updateCardListThunk = (cardListData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        await apiPut(`${BoardRoutes.cardList}`, cardListData);

        dispatch(updateCardList(cardListData));
    } catch (error) {
        dispatch(setError(error.message));
    }
}