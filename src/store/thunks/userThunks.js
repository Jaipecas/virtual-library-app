import { getUserByNameAsync } from "../../services/apiService";
import { setError, setIdle, setLoading, setUser } from "../slices/userSlice";

export const getUserData = (userName) => async (dispatch) => {

    dispatch(setLoading());
    dispatch(setError(''));
    try {
      const user = await getUserByNameAsync(userName)
  
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIdle());
    }
  };