import { apiGet, apiPut, createStudyRoomAsync, deleteStudyRoomsAsync, getInvitedStudyRoomsAsync, getStudyRoomsAsync, updateStudyRoomAsync }
  from "../../services/apiService";
import { addStudyRoom, removeStudyRoom, setConnectedRoomUsers, setError, setIdle, setInvitedStudyRooms, setLoading, setSelectedChatRoom, setStudyRooms, updateConnectedUser, updatePomodoro, updateRoom } from "../slices/studyRoomSlice";
import { StudyRoomRoutes, StudyRoomUserRoutes } from "../../services/apiRoutes";

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

export const getStudyRoomThunk = (roomId) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const room = await apiGet(`${StudyRoomRoutes.getStudyRoomById}?roomId=${roomId}`);

    dispatch(setSelectedChatRoom(room));

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


export const updatePomodoroThunk = (pomodoroData) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));

  try {

    const pomodoro = await apiPut(StudyRoomRoutes.updateTimer, pomodoroData)

    dispatch(updatePomodoro(pomodoro));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

export const updateConnectedUserThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));

  try {

    const roomUserData = await apiPut(StudyRoomUserRoutes.updateRoomUser, userData)

    dispatch(updateConnectedUser(roomUserData.isConnected));

  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getRoomUsersThunk = (roomData) => async (dispatch) => {

  dispatch(setError(''));

  try {

    const roomUsers = await apiGet(StudyRoomUserRoutes.getRoomUsers + `?roomId=${roomData.roomId}&isConnected=${roomData.isConnected}`)

    dispatch(setConnectedRoomUsers(roomUsers));

  } catch (error) {
    dispatch(setError(error.message));
  }
};

