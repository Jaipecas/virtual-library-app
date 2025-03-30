import { signIn, signUp } from "../../services/apiService";
import { login, loginSuccess, logoutSuccess, setError, setIdle, setLoading } from "../slices/authSlice";


export const loginThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    const user = await signIn(userData)
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(login(user));
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(logoutSuccess());
  } 
};
