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

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (user = {}) => {
    //Aqui se deberia hacer la autenticación con la API
    localStorage.setItem("user", JSON.stringify(user));

    //controlar errores de autenticación
    //type: login o error dependiendo del resultado de la autenticación

    const action = {
      type: authTypes.login,
      payload: user,
    };

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
