import { AuthRoutes, StudyRoomRoutes } from "./apiRoutes";

const apiGet = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const apiPost = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  return await apiPost(AuthRoutes.signIn, credentials);
};

export const signUp = async (data) => {
  return await apiPost(AuthRoutes.signUp, data);
};

export const logout = async () => {
  return await apiPost(AuthRoutes.logout, {});
};

export const updateUser = async (data) => {
  return await apiPost(AuthRoutes.updateUser, data);
};

export const createStudyRoom = async (data) => {
  return await apiPost(AuthRoutes.createStudyRoom, data);
};

export const getStudyRoomsAsync = async (userId) => {
  return await apiGet(`${StudyRoomRoutes.getStudyRooms}?UserId=${userId}`);
};