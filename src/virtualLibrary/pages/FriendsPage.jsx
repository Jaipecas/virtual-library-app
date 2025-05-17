import { Alert, Avatar, Box, Card, CardHeader, IconButton, InputAdornment, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import profileMan from "../../assets/images/profileMan.png";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFriendThunk, getUserData } from '../../store/thunks/userThunks';
import { useEffect } from 'react';
import { sendNotificationsThunk } from '../../store/thunks/notificationThunks';
import { setError, sendSuccess } from '../../store/slices/notificationSlice';
import { GridMoreVertIcon } from '@mui/x-data-grid';

export const FriendsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const { successMessage, error: notificationError } = useSelector(state => state.notifications);
    const { user } = useSelector(state => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        dispatch(getUserData(user.id));

        return () => {
            dispatch(setError(null))
            dispatch(sendSuccess(null))
        }

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

    const onMenuClose = () => {
        setAnchorEl(null);
        setSelectedFriend(null);
    };

    const onMenuFriendClick = (event, friendId) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedFriend(friendId);
    };

    const onDeleteFriend = () => {
        dispatch(deleteFriendThunk(user.id, selectedFriend))
        onMenuClose();
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
            {successMessage && <Alert sx={{ marginTop: 1 }} severity="success">{successMessage}</Alert>}

            <Box marginTop={2} display="flex" flexWrap="wrap" gap={3}>
                {userData.friends.map(friend => (
                    <Box position={"relative"}>
                        <Card key={friend.id} sx={{ paddingX: 3 }}>
                            {/* TODO repasar la forma en que se manejan los logos */}
                            <CardHeader avatar={<Avatar src={friend.logo !== null ? friend.logo : profileMan} alt="logo" />}
                                title={friend.userName}
                                subheader={friend.email} />
                        </Card>
                        <IconButton
                            size="small"
                            onClick={(e) => onMenuFriendClick(e, friend.id)}
                            sx={{ position: 'absolute', top: 2, right: 2 }}
                        >
                            <GridMoreVertIcon color="secondary" />
                        </IconButton>
                    </Box>

                ))}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onMenuClose}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={onDeleteFriend}>Eliminar</MenuItem>
            </Menu>

        </>
    )
}
