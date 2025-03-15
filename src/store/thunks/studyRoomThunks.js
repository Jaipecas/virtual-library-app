import { getStudyRoomsAsync } from "../../services/apiService";
import { addStudyRoom, removeStudyRoom, setError, setIdle, setLoading, setStudyRooms } from "../slices/studyRoomSlice";

export const getStudyRooms = (userId) => async (dispatch) => {

  dispatch(setLoading()); 

  try {
    const rooms = await getStudyRoomsAsync(userId)

    dispatch(setStudyRooms(rooms));  
  } catch (error) {
    dispatch(setError('Error al obtener las study rooms')); 
  } finally {
    dispatch(setIdle()); 
  }
};

export const createStudyRoom = (newRoom) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const response = await fetch('/api/studyrooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoom),
    });
    const data = await response.json();

    dispatch(addStudyRoom(data));  
  } catch (error) {
    dispatch(setError('Error al crear la study room'));
  } finally {
    dispatch(setIdle());
  }
};

export const updateStudyRoom = (updatedRoom) => async (dispatch) => {
  dispatch(setLoading());

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
    dispatch(setError('Error al actualizar la study room'));
  } finally {
    dispatch(setIdle());
  }
};

export const deleteStudyRoom = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    await fetch(`/api/studyrooms/${id}`, {
      method: 'DELETE',
    });

    dispatch(removeStudyRoom(id));  
  } catch (error) {
    dispatch(setError('Error al eliminar la study room'));
  } finally {
    dispatch(setIdle());
  }
};
