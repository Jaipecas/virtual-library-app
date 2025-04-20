import { Box, Button, Card, CardContent, Grid2, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCardListThunk, addCardThunk, getBoardThunk } from "../../store/thunks/boardThunks";


export const BoardPage = () => {

    const [newCardText, setNewCardText] = useState("");
    const [activeCardList, setActiveCardList] = useState(null);

    const [showNewCardListInput, setShowNewCardListInput] = useState(false);
    const [newCardListTitle, setNewCardListTitle] = useState("");

    const { selectedBoard } = useSelector(state => state.board);

    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");

        dispatch(getBoardThunk(id))
    }, [])


    const addCard = (cardListId) => {
        if (!newCardText.trim()) return;

        dispatch(addCardThunk({ cardListId: cardListId, title: newCardText }))
        setNewCardText("");
    };

    const addCardList = () => {
        if (!newCardListTitle.trim()) return;  

        dispatch(addCardListThunk({boardId: selectedBoard.id, title: newCardListTitle}))

        setNewCardListTitle("");
        setShowNewCardListInput(false);
    };

    return (
        <Box padding={4}>
            <Typography variant="h4" marginBottom={3}>
                My Board
            </Typography>
            <Grid2 container spacing={3}>
                {selectedBoard.cardLists?.map((cardList) => (
                    <Grid2 xs={12} sm={6} md={4} key={cardList.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {cardList.title}
                            </Typography>
                            {cardList.cards?.map((card) => (
                                <Card key={card.id} sx={{ marginBottom: 1 }}>
                                    <CardContent>
                                        <Typography>{card.content}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            {activeCardList === cardList.id && (
                                <Box mt={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Nueva card"
                                        value={newCardText}
                                        onChange={(e) => setNewCardText(e.target.value)}
                                        sx={{ marginBottom: 1 }}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => addCard(cardList.id)}
                                    >
                                        Añadir
                                    </Button>
                                </Box>
                            )}
                            {activeCardList !== cardList.id && (
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => setActiveCardList(cardList.id)}
                                >
                                    + Añadir card
                                </Button>
                            )}
                        </Paper>
                    </Grid2>
                ))}

                <Grid2 xs={12} sm={6} md={4}>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                        {showNewCardListInput ? (
                            <>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Nombre de la lista"
                                    value={newCardListTitle}
                                    onChange={(e) => setNewCardListTitle(e.target.value)}
                                    sx={{ marginBottom: 1 }}
                                />
                                <Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={addCardList}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Agregar
                                    </Button>
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => setShowNewCardListInput(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => setShowNewCardListInput(true)}
                                fullWidth
                            >
                                + Agregar Lista
                            </Button>
                        )}
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
}
