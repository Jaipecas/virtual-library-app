import { createSlice } from '@reduxjs/toolkit';


const getInitialState = () => {
    const user = localStorage.getItem("user");
    try {
        return user
            ? {
                user: JSON.parse(user),
                loading: false,
                error: null,
                isAuthenticated: true
            }
            : {
                user: null,
                loading: false,
                error: null,
                isAuthenticated: false
            };
    } catch {
        return {
            user: null,
            loading: false,
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
        },
        setLoading(state) {
            state.loading = true;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setIdle(state) {
            state.loading = false;
        },
        loginSuccess(state) {
            state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
        },
    },
});

export const { login, setLoading, setError, setIdle, loginSuccess, logoutSuccess } = authSlice.actions;

