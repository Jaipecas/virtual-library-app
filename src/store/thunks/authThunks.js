import { logoutAsync, signIn, signUp } from "../../services/apiService";
import { login, logout, setError } from "../slices/authSlice";


export const loginThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    const user = await signIn(userData)
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(login(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutThunk = () => async (dispatch) => {

  dispatch(setError(''));
  try {
    await logoutAsync()
    localStorage.removeItem("user");

    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
