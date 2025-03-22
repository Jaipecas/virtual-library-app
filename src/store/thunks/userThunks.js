import { createFriendAsync, getUserByNameAsync } from "../../services/apiService";
import { addFriend, setError, setIdle, setLoading, setUser } from "../slices/userSlice";

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

export const updateFriend = (friendData) => async (dispatch) => {

  dispatch(setLoading());
  dispatch(setError(''));
  try {

    const friend = await createFriendAsync(friendData);

    dispatch(addFriend(friend));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};