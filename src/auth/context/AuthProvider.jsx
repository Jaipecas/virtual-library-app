import { useReducer } from "react";
import { logout, signIn, signUp, updateUser } from "../../services/apiService";
import { authTypes } from "../types/authTypes";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const init = () => {
  const user = localStorage.getItem("user");
  try {
    return user
      ? { isAuthenticated: true, user: JSON.parse(user) }
      : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async (user = {}) => {
    let action = {};

    try {
      const data = await signIn(user);
      localStorage.setItem("user", JSON.stringify(data));
      action = {
        type: authTypes.login,
        payload: data,
      };
    } catch (error) {
      action = {
        type: authTypes.error,
        payload: error.message,
      };
    }

    dispatch(action);
  };

  const register = async (user = {}) => {
    let action = {};

    try {
      const data = await signUp(user);
      localStorage.setItem("user", JSON.stringify(data));
      action = {
        type: authTypes.login,
        payload: data,
      };
    } catch (error) {
      action = {
        type: authTypes.error,
        payload: error.message,
      };
    }

    dispatch(action);
  };

  const userLogout = async () => {
    let action = {};
    try {
      await logout();

      localStorage.removeItem("user");
      action = {
        type: authTypes.logout,
      };
    } catch (error) {
      action = {
        type: authTypes.error,
        payload: error.message,
      };
    }

    dispatch(action);
  };

  const updateUserData = async (user = {}) => {
    let action = {};
    try {
      const data = await updateUser(user);

      localStorage.setItem("user", JSON.stringify(data));

      action = {
        type: authTypes.updateUser,
        payload: data,
      };
      dispatch(action);

      return null;

    } catch (error) {
      action = {
        type: authTypes.updateError,
        payload: error.message,
      };

      dispatch(action);

      return error.message;
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, userLogout, register, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
