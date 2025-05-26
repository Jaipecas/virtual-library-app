import { apiDelete, apiGet } from "../../services/apiService";
import { deleteFriend, setError, setUser } from "../slices/userSlice";
import { UserRoutes, FriendRoutes } from "../../services/apiRoutes";

export const getUserData = (userId) => async (dispatch) => {

  try {

    const user = await apiGet(`${UserRoutes.user}?UserId=${userId}`)

    dispatch(setUser(user));
    dispatch(setError(null))
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const deleteFriendThunk = (userId, friendId) => async (dispatch) => {

  try {

    const user = await apiDelete(`${FriendRoutes.friend}?userId=${userId}&friendId=${friendId}`)

    dispatch(deleteFriend(friendId));
    dispatch(setError(null))
  } catch (error) {
    dispatch(setError(error.message));
  }
};
