import { signIn, signUp } from "../../services/apiService";
import { login, loginSuccess, setError, setIdle, setLoading } from "../slices/authSlice";


export const loginThunk = (user) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {
    const user = await signUp(user)

    dispatch(login(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
    dispatch(loginSuccess());
  }
};
