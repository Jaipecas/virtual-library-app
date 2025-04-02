import { createStudyRoomAsync, deleteStudyRoomsAsync, getInvitedStudyRoomsAsync, getStudyRoomsAsync, updateStudyRoomAsync } from "../../services/apiService";
import { addStudyRoom, removeStudyRoom, setError, setIdle, setInvitedStudyRooms, setLoading, setStudyRooms, updateRoom } from "../slices/studyRoomSlice";

export const getStudyRooms = (userId) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const rooms = await getStudyRoomsAsync(userId)

    dispatch(setStudyRooms(rooms));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

export const getInvitedStudyRooms = (userId) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const rooms = await getInvitedStudyRoomsAsync(userId)

    dispatch(setInvitedStudyRooms(rooms));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};


export const createStudyRoom = (newRoom) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));
  try {

    const room = await createStudyRoomAsync(newRoom)

    dispatch(addStudyRoom(room));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

export const updateStudyRoom = (updatedRoom) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));

  try {
    
    const room = await updateStudyRoomAsync(updatedRoom)

    dispatch(updateRoom(room));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

export const deleteStudyRoom = (id) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));
  try {
    await deleteStudyRoomsAsync(id)

    dispatch(removeStudyRoom(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};
