import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    loading: false,
    error: null,
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        removeNotification(state, action) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
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

export const { setNotifications, addNotification, removeNotification, setLoading, setError, setIdle } = notificationSlice.actions;

