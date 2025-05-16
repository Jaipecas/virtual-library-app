
const API_BASE_URL = "https://localhost:44347/api";
const API_CHAT_BASE_URL = "https://localhost:7013";

export const AuthRoutes = {
  signIn: `${API_BASE_URL}/Auth/signIn`,
  signUp: `${API_BASE_URL}/Auth/signUp`,
  logout: `${API_BASE_URL}/Auth/logout`,
  updateUser: `${API_BASE_URL}/Auth/updateUser`,
};

export const StudyRoomRoutes = {
  getStudyRooms: `${API_BASE_URL}/studyroom/getStudyRoomsByOwner`,
  getInvitedStudyRooms: `${API_BASE_URL}/studyroom/getInvitedStudyRooms`,
  getStudyRoomById: `${API_BASE_URL}/studyroom/getStudyRoomById`,
  studyRoom: `${API_BASE_URL}/studyroom`,
  updateTimer: `${API_BASE_URL}/studyroom/updateRoomTimer`,
};

export const UserRoutes = {
  user: `${API_BASE_URL}/user`,
  friend: `${API_BASE_URL}/user/friends`,
};

export const NotificationRoutes = {
  notification: `${API_BASE_URL}/notification`,
};

export const StudyRoomUserRoutes = {
  updateRoomUser: `${API_BASE_URL}/studyroomuser`,
  getRoomUsers:`${API_BASE_URL}/studyroomuser`,
  deleteRoomUsers:`${API_BASE_URL}/studyroomuser`,
};

export const RoomChatRoutes = {
  roomChat: `${API_CHAT_BASE_URL}/roomChatHub`,
}

export const BoardRoutes = {
  board: `${API_BASE_URL}/board`,
  cardList: `${API_BASE_URL}/cardList`,
  card: `${API_BASE_URL}/cards`,
}


