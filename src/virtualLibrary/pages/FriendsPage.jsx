import { Avatar, Box, Card, CardHeader, CardMedia, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import profileWoman from "../../assets/images/profileWoman.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../store/thunks/userThunks';

export const FriendsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector(state => state.user);

    const onSearchUser = (event) => {
        event.preventDefault();

        //TODO buscar al user by name

        dispatch(getUserData(search));

        

        //TODO agregar como amigo al user
    }

    const onSetSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <form onSubmit={onSearchUser}>
                <TextField
                    label="Buscar usuario"
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

            <Box marginTop={2} display="flex" flexWrap="wrap" gap={3}>
                {userData.friends.map(friend => (
                    <Card key={friend.id}>
                        <CardHeader avatar={<Avatar src={profileWoman} alt="logo" />}
                            title={friend.userName}
                            subheader={friend.email} />
                    </Card>
                ))}
            </Box>

        </>
    )
}
