import { AuthRoutes, StudyRoomRoutes, UserRoutes, NotificationRoutes } from "./apiRoutes";

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

const apiDelete = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errorMessage);
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};

const apiPut = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
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

export const createStudyRoomAsync = async (data) => {
  return await apiPost(StudyRoomRoutes.studyRoom, data);
};

export const deleteStudyRoomsAsync = async (id) => {
  return await apiDelete(`${StudyRoomRoutes.studyRoom}?StudyRoomId=${id}`);
};

export const updateStudyRoomAsync = async (data) => {
  return await apiPut(StudyRoomRoutes.studyRoom, data);
};

export const getStudyRoomsAsync = async (userId) => {
  return await apiGet(`${StudyRoomRoutes.getStudyRooms}?UserId=${userId}`);
};

export const getUserByNameAsync = async (userName) => {
  return await apiGet(`${UserRoutes.user}?UserName=${userName}`);
};

export const createFriendAsync = async (friend) => {
  return await apiPost(UserRoutes.friend, friend);
};

export const getNotificationsAsync = async (userId) => {
  return await apiGet(`${NotificationRoutes.notification}?UserId=${userId}`);
};

export const createNotificationAsync = async (notification) => {
  return await apiPost(NotificationRoutes.notification, notification);
};

export const deleteNotificationAsync = async (id, isAccepted, notificationType) => {
  return await apiDelete(`${NotificationRoutes.notification}?id=${id}&isAccepted=${isAccepted}&notificationType=${notificationType}`);
};
