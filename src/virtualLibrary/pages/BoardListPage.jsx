import { Box, Button, Card, CardActionArea, CardContent, Grid2, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";

const initialData = [
    { id: 1, title: "board 1" }, { id: 2, title: "board 2" }, { id: 3, title: "board 3" }
]

export const BoardListPage = () => {
    const [boards, setBoards] = useState(initialData);
    const [showNewBoardInput, setShowNewBoardInput] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");


    const addBoard = () => {
        if (!newBoardTitle.trim()) return;

        const newBoard = {
            title: newBoardTitle,
        };
        setBoards([...boards, newBoard]);
        setNewBoardTitle("");
        setShowNewBoardInput(false);
    };

    return (
        <Box padding={4}>
            <Typography variant="h4">
                My Boards
            </Typography>
            <Grid2 container padding={2} spacing={2}>
                {boards.map((board) => (
                    <Grid2 xs={12} sm={6} md={4} key={board.id}>
                        <Card>
                            <CardActionArea sx={{ height: "100%", padding: 2 }}>
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
