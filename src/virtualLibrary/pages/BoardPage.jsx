import { Box, Button, Card, CardContent, Grid2, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";

const initialData = [
    {
        id: 1,
        title: "To Do",
        cards: [
            { id: 1, content: "Buy groceries" },
            { id: 2, content: "Call plumber" },
        ],
    },
    {
        id: 2,
        title: "In Progress",
        cards: [{ id: 3, content: "Building Trello clone" }],
    },
    {
        id: 3,
        title: "Done",
        cards: [{ id: 4, content: "Read a book" }],
    },
];


export const BoardPage = () => {
    const [cardList, setCardList] = useState(initialData);
    const [newCardText, setNewCardText] = useState("");
    const [activeCardList, setActiveCardList] = useState(null);

    const [showNewCardListInput, setShowNewCardListInput] = useState(false);
    const [newCardListTitle, setNewCardListTitle] = useState("");

    const addCard = (cardListId) => {
        if (!newCardText.trim()) return;

        const newCardList = cardList.map((cardList) =>
            cardList.id === cardListId
                ? {
                    ...cardList,
                    cards: [
                        ...cardList.cards,
                        {
                            id: Date.now(),
                            content: newCardText,
                        },
                    ],
                }
                : cardList
        );
        setCardList(newCardList);
        setNewCardText("");
    };

    const addBoard = () => {
        if (!newCardListTitle.trim()) return;

        const newCardList = {
            title: newCardListTitle,
            cards: [],
        };
        setCardList([...cardList, newCardList]);
        setNewCardListTitle("");
        setShowNewCardListInput(false);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Board
            </Typography>
            <Grid2 container spacing={3}>
                {cardList.map((cardList) => (
                    <Grid2 item xs={12} sm={6} md={4} key={cardList.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {cardList.title}
                            </Typography>
                            {cardList.cards.map((card) => (
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

                <Grid2 item xs={12} sm={6} md={4}>
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
                                        onClick={addBoard}
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
