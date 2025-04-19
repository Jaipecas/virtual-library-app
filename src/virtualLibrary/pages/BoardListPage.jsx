import { Alert, Box, Button, Card, CardActionArea, CardContent, Grid2, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBoardThunk, getBoardsThunk } from "../../store/thunks/boardThunks";
import { useNavigate } from "react-router-dom";

export const BoardListPage = () => {

    const [showNewBoardInput, setShowNewBoardInput] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");
    const { boards, error } = useSelector(state => state.board);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoardsThunk(user.id))
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

    return (
        <Box padding={4}>
            <Typography variant="h4">
                My Boards
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid2 container padding={2} spacing={2}>
                {boards.map((board) => (
                    <Grid2 xs={12} sm={6} md={4} key={board.id}>
                        <Card>
                            <CardActionArea sx={{ height: "100%", padding: 2 }} onClick={() => onNavigateBoard(board.id)}>
                                <CardContent>
                                    <Typography variant="h6">{board.title}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
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
        </Box>
    )
}
