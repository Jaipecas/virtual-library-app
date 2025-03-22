import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import profileWoman from "../../assets/images/profileWoman.png";


//TODO eliminar array pruebas
const userFriends = {
    id: "dsadsa1", logo: null, userName: "japerez", email: "japerez@gmail.com",
    friends: [{ id: "dsadsa2", logo: null, userName: "pepe", email: "pepe@gmail.com" },
    { id: "dsadsa3", logo: null, userName: "pepe", email: "pepe@gmail.com" },
    { id: "dsadsa4", logo: null, userName: "pepe", email: "pepe@gmail.com" }]
}

export const FriendsPage = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        //TODO hacer llamada a BD
        setUsers(userFriends.friends)
    }, [])


    const onSearchUser = (event) => {
        event.preventDefault();

        //TODO buscar al user by name

        const user = { id: "dsadsa5", logo: null, userName: "juan", email: "juan@gmail.com" };

        setUsers(prev => [...prev, user]);

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
                {users.map(friend => (
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
