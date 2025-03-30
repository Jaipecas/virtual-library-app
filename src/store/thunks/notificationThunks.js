import { deleteNotificationAsync, getNotificationsAsync, sendNotificationAsync } from "../../services/apiService";
import { removeNotification, setError, setIdle, setLoading, setNotifications } from "../slices/notificationSlice";

//TODO simplificar codigo con CreateThunk
export const getNotifications = (userId) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const user = await getNotificationsAsync(userId)

    dispatch(setNotifications(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};


export const deleteNotification = (id, isAccepted, notificationType) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setError(''));
  try {

    await deleteNotificationAsync(id, isAccepted, notificationType);

    dispatch(removeNotification(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

export const sendNotificationsThunk = (notificationData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    await sendNotificationAsync(notificationData)

  } catch (error) {
    dispatch(setError(error.message));
  } 
};