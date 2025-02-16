import React from "react";
import { useReducer } from "react";
import { authTypes } from "../types/authTypes";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    isAuthenticated: !!user,
    user: user,
  };
};

const fetchLogin = async (user) => {
  const credentials = { email: user.email, password: user.password };

  try {
    const response = await fetch("https://localhost:44347/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        type: authTypes.error,
        payload: data.errorMessage,
      };
    }

    localStorage.setItem("user", JSON.stringify(user));

    return {
      type: authTypes.login,
      payload: data,
    };
  } catch (error) {
    return {
      type: authTypes.error,
      payload: error,
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async (user = {}) => {
    const action = await fetchLogin(user);
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem("user");

    const action = {
      type: authTypes.logout,
    };

    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
