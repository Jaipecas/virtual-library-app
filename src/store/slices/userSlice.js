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
        addFriend(state, action) {
            state.userData.friends.push(action.payload);
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

export const { setUser, addFriend, setLoading, setError, setIdle } = userSlice.actions;

