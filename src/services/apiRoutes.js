
const API_BASE_URL = "https://localhost:44347/api";

export const AuthRoutes = {
  signIn: `${API_BASE_URL}/Auth/signIn`,
  signUp: `${API_BASE_URL}/Auth/signUp`,
  logout: `${API_BASE_URL}/Auth/logout`,
  updateUser: `${API_BASE_URL}/Auth/updateUser`,
};

export const StudyRoomRoutes = {
  getStudyRooms: `${API_BASE_URL}/studyroom/getStudyRoomsByOwner`,
  studyRoom: `${API_BASE_URL}/studyroom`,
};

export const UserRoutes = {
  user: `${API_BASE_URL}/user`,
  friend: `${API_BASE_URL}/user/friends`,
};

export const NotificationRoutes = {
  notification: `${API_BASE_URL}/notification`,
};


