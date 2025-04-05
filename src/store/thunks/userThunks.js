import { getUserByIdAsync } from "../../services/apiService";
import { setError, setIdle, setLoading, setUser } from "../slices/userSlice";

export const getUserData = (userId) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const user = await getUserByIdAsync(userId)

    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};
