import { getNotificationsAsync } from "../../services/apiService";
import { setError, setIdle, setLoading, setNotifications } from "../slices/notificationSlice";


export const getUserData = (userName) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const user = await getNotificationsAsync(userName)

    dispatch(setNotifications(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};
