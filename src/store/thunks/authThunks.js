import { logoutAsync, signIn, signUp, updateUserAsync } from "../../services/apiService";
import { login, logout, setError, updateUser } from "../slices/authSlice";


export const loginThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    const user = await signIn(userData)
    
    dispatch(login(user));
    localStorage.setItem("user", JSON.stringify(user));
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

export const registerThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    const user = await signUp(userData)
    
    dispatch(login(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateUserThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {
    const user = await updateUserAsync(userData)

    dispatch(updateUser(user))
    localStorage.setItem("user", JSON.stringify(user));

  } catch (error) {
    dispatch(setError(error.message));
  }
};
