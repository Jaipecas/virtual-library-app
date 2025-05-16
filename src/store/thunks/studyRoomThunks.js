import { apiDelete, apiGet, apiPost, apiPut }
  from "../../services/apiService";
import { addStudyRoom, removeInvitedStudyRoom, removeStudyRoom, setConnectedRoomUsers, setError, setIdle, setInvitedStudyRooms, setLoading, setSelectedChatRoom, setStatus, setStudyRooms, updatePomodoro, updateRoom } from "../slices/studyRoomSlice";
import { StudyRoomRoutes, StudyRoomUserRoutes } from "../../services/apiRoutes";

export const getStudyRooms = (userId) => async (dispatch) => {

  try {
    const rooms = await apiGet(`${StudyRoomRoutes.getStudyRooms}?UserId=${userId}`);

    dispatch(setStudyRooms(rooms));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getInvitedStudyRooms = (userId) => async (dispatch) => {

  try {
    const rooms = await apiGet(`${StudyRoomRoutes.getInvitedStudyRooms}?UserId=${userId}`);

    dispatch(setInvitedStudyRooms(rooms));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getStudyRoomThunk = (roomId) => async (dispatch) => {

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

  try {

    const room = await apiPost(StudyRoomRoutes.studyRoom, newRoom)

    dispatch(addStudyRoom(room));
    dispatch(setStatus("success"));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateStudyRoom = (updatedRoom) => async (dispatch) => {

  try {

    const room = await apiPut(StudyRoomRoutes.studyRoom, updatedRoom);

    dispatch(updateRoom(room));
    dispatch(setStatus("success"));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteStudyRoom = (id) => async (dispatch) => {
  try {

    await apiDelete(`${StudyRoomRoutes.studyRoom}?StudyRoomId=${id}`);

    dispatch(removeStudyRoom(id));
    dispatch(setStatus("success"));
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const updatePomodoroThunk = (pomodoroData) => async (dispatch) => {

  try {

    const pomodoro = await apiPut(StudyRoomRoutes.updateTimer, pomodoroData)

    dispatch(updatePomodoro(pomodoro));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getRoomUsersThunk = (roomData) => async (dispatch) => {

  try {

    const roomUsers = await apiGet(StudyRoomUserRoutes.getRoomUsers + `?roomId=${roomData.roomId}&isConnected=${roomData.isConnected}`)

    dispatch(setConnectedRoomUsers(roomUsers));

  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteInvitedRoomThunk = (roomId, userId) => async (dispatch) => {
  try {

    await apiDelete(`${StudyRoomUserRoutes.deleteRoomUsers}?roomId=${roomId}&userId=${userId}`);

    dispatch(removeInvitedStudyRoom(roomId));
    
  } catch (error) {
    dispatch(setError(error.message));
  }
};

