import { BoardRoutes } from "../../services/apiRoutes";
import { apiGet, apiPost } from "../../services/apiService";
import { addBoard, setBoards, setError } from "../slices/boardSlice"

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