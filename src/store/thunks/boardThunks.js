import { BoardRoutes } from "../../services/apiRoutes";
import { apiPost } from "../../services/apiService";
import { addBoard, setError } from "../slices/boardSlice"

export const AddBoardThunk = (boardData) => async (dispatch) => {

    dispatch(setError(""));

    try {
        const board = await apiPost(BoardRoutes.board, boardData);

        dispatch(addBoard(board));
    } catch (error) {
        dispatch(setError(error.message));
    }
}