import { Alert, Box, Button, Card, CardActionArea, CardContent, Grid2, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBoardThunk, getBoardsThunk, removeBoardThunk } from "../../store/thunks/boardThunks";
import { useNavigate } from "react-router-dom";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { setError } from "../../store/slices/boardSlice";
import theme from "../../themes/theme";

export const BoardListPage = () => {

    const [showNewBoardInput, setShowNewBoardInput] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuBoardId, setMenuBoardId] = useState(null);

    const { boards, error } = useSelector(state => state.board);

    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoardsThunk(user.id))

        return () => {
            dispatch(setError(null));
        }
    }, [])

    const addBoard = () => {
        if (!newBoardTitle.trim()) return;

        const newBoard = {
            userId: user.id,
            title: newBoardTitle,
        };

        setNewBoardTitle("");
        setShowNewBoardInput(false);
        dispatch(addBoardThunk(newBoard));
    };


    const onNavigateBoard = (boardId) => {
        navigate(`/library/boards/board?id=${boardId}`);
    }

    const onMenuClick = (event, boardId) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setMenuBoardId(boardId);
    };

    const onMenuClose = () => {
        setAnchorEl(null);
        setMenuBoardId(null);
    };

    const onDeleteBoard = () => {
        dispatch(removeBoardThunk(menuBoardId))
        onMenuClose();
    }


    return (
        <Box padding={4}>
            <Typography variant="h4" color={theme.palette.secondary.dark}>
                Mis Tableros
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid2 container padding={2} spacing={2}>
                {boards.map((board) => (
                    <Grid2 xs={12} sm={6} md={4} key={board.id}>
                        <Box position={"relative"}>
                            <Card sx={{ backgroundColor: theme.palette.primary.light }}>
                                <CardActionArea sx={{ padding: 4 }} onClick={() => onNavigateBoard(board.id)}>
                                    <CardContent>
                                        <Typography variant="h6">{board.title}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <IconButton
                                    size="small"
                                    onClick={(e) => onMenuClick(e, board.id)}
                                    sx={{ position: 'absolute', top: 8, right: 8 }}
                                >
                                    <GridMoreVertIcon color="secondary" />
                                </IconButton>
                            </Card>
                        </Box>
                    </Grid2>
                ))}

                <Grid2 xs={12} sm={6} md={4}>
                    {showNewBoardInput ? (
                        <Paper sx={{ padding: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Título del board"
                                value={newBoardTitle}
                                onChange={(e) => setNewBoardTitle(e.target.value)}
                                sx={{ marginBottom: 1 }}
                            />
                            <Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={addBoard}
                                    sx={{ marginRight: 1 }}
                                >
                                    Agregar
                                </Button>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => setShowNewBoardInput(false)}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Paper>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={() => setShowNewBoardInput(true)}
                            fullWidth
                        >
                            + Añadir Board
                        </Button>
                    )}

                </Grid2>
            </Grid2>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onMenuClose}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={onDeleteBoard}>Eliminar</MenuItem>
            </Menu>
        </Box>
    )
}
