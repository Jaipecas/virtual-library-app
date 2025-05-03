import { apiDelete, apiGet, apiPost } from "../../services/apiService";
import { removeNotification, sendSuccess, setError, setNotifications } from "../slices/notificationSlice";
import { NotificationRoutes } from "../../services/apiRoutes";

export const getNotifications = (userId) => async (dispatch) => {

  try {
    const user = await apiGet(`${NotificationRoutes.notification}?UserId=${userId}`);

    dispatch(setNotifications(user));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const deleteNotification = (id, isAccepted, notificationType) => async (dispatch) => {

  try {

    await apiDelete(`${NotificationRoutes.notification}?id=${id}&isAccepted=${isAccepted}&notificationType=${notificationType}`)

    dispatch(removeNotification(id));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
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