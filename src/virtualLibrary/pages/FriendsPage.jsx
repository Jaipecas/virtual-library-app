import { Alert, Avatar, Box, Card, CardHeader, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import profileMan from "../../assets/images/profileMan.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../store/thunks/userThunks';
import { useEffect } from 'react';
import { sendNotificationsThunk } from '../../store/thunks/notificationThunks';
import { setError, sendSuccess } from '../../store/slices/notificationSlice';

export const FriendsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const { sendSuccess: sendSuccessMessage , error: notificationError } = useSelector(state => state.notifications);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUserData(user.id));
        dispatch(setError(''))
        dispatch(sendSuccess(''))
    }, [])

    const onSendNotification = (event) => {
        event.preventDefault();

        dispatch(sendNotificationsThunk({
            senderId: user.id,
            recipientName: search,
            title: `Invitación amistad`,
            message: `${user.userName} te ha enviado una invitación de amistad`,
            notificationType: "Friend",
        }))
    }

    const onSetSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <form onSubmit={onSendNotification}>
                <TextField
                    label="Agregar amigos"
                    variant="outlined"
                    value={search}
                    onChange={onSetSearch}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={onSendNotification}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>

            {notificationError && <Alert sx={{ marginTop: 1 }} severity="error">{notificationError}</Alert>}
            {sendSuccessMessage && <Alert sx={{ marginTop: 1 }} severity="success">{sendSuccessMessage}</Alert>}

            <Box marginTop={2} display="flex" flexWrap="wrap" gap={3}>
                {userData.friends.map(friend => (
                    <Card key={friend.id}>
                        {/* TODO repasar la forma en que se manejan los logos */}
                        <CardHeader avatar={<Avatar src={friend.logo !== null ? friend.logo : profileMan} alt="logo" />}
                            title={friend.userName}
                            subheader={friend.email} />
                    </Card>
                ))}
            </Box>

        </>
    )
}
