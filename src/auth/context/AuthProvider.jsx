import React from "react";
import { useReducer } from "react";
import { logout, signIn, signUp } from "../../services/apiService";
import { authTypes } from "../types/authTypes";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const init = () => {
  const user = localStorage.getItem("user");

  return {
    isAuthenticated: !!user,
    user: !user ? JSON.parse(user) : null,
  };
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

      action = {
        type: authTypes.logout,
      };

      localStorage.removeItem("user");
    } catch (error) {
      action = {
        type: authTypes.error,
        payload: error.message,
      };
    }

    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ authState, login, userLogout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
