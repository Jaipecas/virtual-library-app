import { Box, Button, Card, CardActionArea, CardContent, Checkbox, Grid2, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCardListThunk, addCardThunk, getBoardThunk, removeCardListThunk, removeCardThunk, updateBoardThunk, updateCardListThunk, updateCardThunk } from "../../store/thunks/boardThunks";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { DndContext } from "@dnd-kit/core";
import { DraggableCard } from "../components/DraggableCard";
import { DroppableCardList } from "../components/DroppableCardList";


export const BoardPage = () => {

    const [newCardText, setNewCardText] = useState("");
    const [activeCardList, setActiveCardList] = useState(null);
    const [showNewCardListInput, setShowNewCardListInput] = useState(false);
    const [newCardListTitle, setNewCardListTitle] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuCard, setMenuCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [updateCardText, setUpdateCardText] = useState("");

    const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);
    const [updateBoardTitle, setUpdateBoardTitle] = useState("");

    const [cardListEditingTitle, setCardListEditingTitle] = useState(null);
    const [updateCardListTitle, setUpdateCardListTitle] = useState("");

    const [anchorElMenuCardList, setAnchorElMenuCardList] = useState(null);
    const [menuCardList, setMenuCardList] = useState(null);


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

        dispatch(addCardListThunk({ boardId: selectedBoard.id, title: newCardListTitle }))

        setNewCardListTitle("");
        setShowNewCardListInput(false);
    };

    const onMenuClick = (event, card) => {
        event.stopPropagation();

        setAnchorEl(event.currentTarget);
        setMenuCard(card);
    };

    const onMenuClose = () => {
        setAnchorEl(null);
        setMenuCard(null);
    };

    const onDeleteCard = () => {
        dispatch(removeCardThunk(menuCard.id));
        onMenuClose();
    }

    const onActiveCard = (card) => {
        setActiveCard(card.id);
        setUpdateCardText(card.title)
    }

    const onUpdateTitleCard = (card) => {
        const updatedCard = {
            ...card,
            title: updateCardText
        };
        dispatch(updateCardThunk(updatedCard));
        setActiveCard(null);
    }

    const onUpdateCompleteCard = (isChecked, card) => {
        const updatedCard = { ...card, isComplete: isChecked };
        dispatch(updateCardThunk(updatedCard));
    };

    const onEditBoardTitle = () => {
        setUpdateBoardTitle(selectedBoard.title);
        setIsEditingBoardTitle(true);
    };

    const onUpdateBoardTitle = (key) => {
        if (key !== "Enter") return;

        const updateBoard = {
            ...selectedBoard,
            title: updateBoardTitle,
        };

        dispatch(updateBoardThunk(updateBoard))
        setIsEditingBoardTitle(false);
    }

    const onEditCardListTitle = (cardList) => {
        setUpdateCardListTitle(cardList.title);
        setCardListEditingTitle(cardList.id);
    };

    const onUpdateCardListTitle = (key, cardList) => {
        if (key !== "Enter") return;

        const updateCardList = {
            ...cardList,
            title: updateCardListTitle,
        };

        dispatch(updateCardListThunk(updateCardList))
        setCardListEditingTitle(null);
    }

    const onMenuCardListClose = () => {
        setAnchorElMenuCardList(null);
        setMenuCardList(null);
    };

    const onMenuCardListClick = (event, cardList) => {
        event.stopPropagation();

        setAnchorElMenuCardList(event.currentTarget);
        setMenuCardList(cardList);
    };

    const onDeleteCardList = () => {
        dispatch(removeCardListThunk(menuCardList.id));
        onMenuCardListClose();
    }

    function handleDragEnd(event) {
        console.log(event);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Box padding={4}>
                {isEditingBoardTitle
                    ? (<TextField
                        value={updateBoardTitle}
                        onChange={(e) => setUpdateBoardTitle(e.target.value)}
                        onKeyDown={(e) => onUpdateBoardTitle(e.key)}
                        autoFocus
                        variant="outlined"
                        sx={{ marginBottom: 3 }} />)
                    : (<Typography
                        variant="h4"
                        marginBottom={3}
                        sx={{ cursor: "pointer" }}
                        onClick={onEditBoardTitle}>
                        {selectedBoard.title}
                    </Typography>)}


                <Grid2 container spacing={3}>
                    {selectedBoard.cardLists?.map((cardList) => (
                        <Grid2 xs={12} sm={6} md={4} key={cardList.id}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <DroppableCardList key={cardList.id} id={cardList.id}>                                    
                                        {cardListEditingTitle == cardList.id
                                            ? (<TextField
                                                value={updateCardListTitle}
                                                sx={{ marginBottom: 2, paddingRight: 8 }}
                                                onChange={(e) => setUpdateCardListTitle(e.target.value)}
                                                onKeyDown={(e) => onUpdateCardListTitle(e.key, cardList)}
                                                variant="outlined"
                                                autoFocus
                                            />)
                                            : (<Typography
                                                variant="h6"
                                                sx={{ cursor: "pointer", paddingRight: 8 , marginBottom: 1.5}}
                                                onClick={() => onEditCardListTitle(cardList)}>
                                                {cardList.title}
                                            </Typography>)}
                                        <IconButton
                                            size="small"
                                            sx={{ position: 'absolute', top: 1, right: 1 }}
                                            onClick={(e) => onMenuCardListClick(e, cardList)}
                                        >
                                            <GridMoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorElMenuCardList}
                                            open={Boolean(anchorElMenuCardList)}
                                            onClose={onMenuCardListClose}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MenuItem onClick={onDeleteCardList}>Eliminar</MenuItem>
                                        </Menu>


                                    {cardList.cards?.map((card) => (
                                        <DraggableCard
                                            key={card.id}
                                            card={card}
                                            setUpdateCardText={setUpdateCardText}
                                            updateCardText={updateCardText}
                                            onUpdateTitleCard={onUpdateTitleCard}
                                            onUpdateCompleteCard={onUpdateCompleteCard}
                                            onActiveCard={onActiveCard}
                                            onMenuClick={onMenuClick}
                                            activeCard={activeCard}
                                        />
                                    ))}
                                </DroppableCardList>
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
                                        onKeyDown={(e) => { if (e.key === "Enter") addCardList() }}
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={onMenuClose}
                    onClick={(e) => e.stopPropagation()}
                >
                    <MenuItem onClick={onDeleteCard}>Eliminar</MenuItem>
                </Menu>
            </Box>
        </DndContext>
    );
}
