import { apiGet } from "../../services/apiService";
import { setError, setUser } from "../slices/userSlice";
import { UserRoutes } from "../../services/apiRoutes";

export const getUserData = (userId) => async (dispatch) => {

  try {

    const user = await apiGet(`${UserRoutes.user}?UserId=${userId}`)

    dispatch(setUser(user));
    dispatch(setError(null))  
  } catch (error) {
    dispatch(setError(error.message));
  }
};
