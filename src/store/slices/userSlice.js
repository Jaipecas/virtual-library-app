import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {
        id: null,
        logo: null,
        userName: null,
        email: null,
        friends: []
    },
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFriends(state, action) {
            state.userData.friends = action.payload;
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
    },
});

export const { setFriends, setLoading, setError, setIdle } = userSlice.actions;

