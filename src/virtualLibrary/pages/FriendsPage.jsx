import { Alert, Avatar, Box, Card, CardHeader, CardMedia, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import profileMan from "../../assets/images/profileMan.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateFriend } from '../../store/thunks/userThunks';
import { useEffect } from 'react';

export const FriendsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector(state => state.user);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUserData(user.id));
      }, [])

    const onSearchUser = (event) => {
        event.preventDefault();

        dispatch(updateFriend({ userId: user.id, friendName: search }));
    }

    const onSetSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <form onSubmit={onSearchUser}>
                <TextField
                    label="Agregar amigos"
                    variant="outlined"
                    value={search}
                    onChange={onSetSearch}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={onSearchUser}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>

            {error && <Alert sx={{ marginTop: 1 }} severity="error">{error}</Alert>}

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
