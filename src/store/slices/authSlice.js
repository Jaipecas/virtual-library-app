import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    const user = localStorage.getItem("user");
    try {
        return user
            ? {
                user: JSON.parse(user),
                error: null,
                isAuthenticated: true,
            }
            : {
                user: null,
                error: null,
                isAuthenticated: false
            };
    } catch {
        return {
            user: null,
            error: null,
            isAuthenticated: false
        };
    }
};

const initialState = getInitialState();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { login, logout, updateUser, setError } = authSlice.actions;

