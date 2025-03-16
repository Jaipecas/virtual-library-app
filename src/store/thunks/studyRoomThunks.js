import { createStudyRoomAsync, deleteStudyRoomsAsync, getStudyRoomsAsync } from "../../services/apiService";
import { addStudyRoom, removeStudyRoom, setError, setIdle, setLoading, setStudyRooms } from "../slices/studyRoomSlice";

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

export const createStudyRoom = (newRoom) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));
  try {

    await createStudyRoomAsync(newRoom)

    dispatch(addStudyRoom(newRoom));
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
    const response = await fetch(`/api/studyrooms/${updatedRoom.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRoom),
    });
    const data = await response.json();

    dispatch(updateStudyRoom(data));
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
