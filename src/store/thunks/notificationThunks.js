import { apiPost, deleteNotificationAsync, getNotificationsAsync } from "../../services/apiService";
import { removeNotification, sendSuccess, setError, setIdle, setLoading, setNotifications } from "../slices/notificationSlice";
import { NotificationRoutes } from "../../services/apiRoutes";

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

  try {

    await apiPost(NotificationRoutes.notification, notificationData);
    
    dispatch(sendSuccess("Notificación enviada"))
    dispatch(setError(null))
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(sendSuccess(null));
  }
};