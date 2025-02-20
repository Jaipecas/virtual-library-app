import { authTypes } from "../types/authTypes";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case authTypes.login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case authTypes.logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case authTypes.updateUser:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case authTypes.error:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
