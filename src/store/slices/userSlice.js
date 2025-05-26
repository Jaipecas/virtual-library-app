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
        setUser(state, action) {
            state.userData = action.payload;
        },
        deleteFriend(state, action) {
            state.userData.friends = state.userData.friends.filter(f => f.id != action.payload);
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

export const { setUser, setLoading, setError, setIdle, deleteFriend } = userSlice.actions;

