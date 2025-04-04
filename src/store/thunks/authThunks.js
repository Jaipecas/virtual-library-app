import { AuthRoutes } from "../../services/apiRoutes";
import { apiPost } from "../../services/apiService";
import { login, logout, setError, updateUser } from "../slices/authSlice";


export const loginThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {

    const user = await apiPost(AuthRoutes.signIn, userData);
    
    dispatch(login(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutThunk = () => async (dispatch) => {

  dispatch(setError(''));
  try {

    await apiPost(AuthRoutes.logout, {});
    localStorage.removeItem("user");

    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {

    const user = await apiPost(AuthRoutes.signUp, userData);
    
    dispatch(login(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateUserThunk = (userData) => async (dispatch) => {

  dispatch(setError(''));
  try {

    const user = await apiPost(AuthRoutes.updateUser, userData);

    dispatch(updateUser(user))
    localStorage.setItem("user", JSON.stringify(user));

  } catch (error) {
    dispatch(setError(error.message));
  }
};
