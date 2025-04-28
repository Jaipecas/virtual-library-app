import { useDraggable } from '@dnd-kit/core';
import { Box, Button, Card, CardContent, Checkbox, Grid2, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"

export const DraggableCard = (
    {
        card,
        setUpdateCardText,
        updateCardText,
        onUpdateTitleCard,
        onUpdateCompleteCard,
        onActiveCard,
        onMenuClick,
        activeCard,
    }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: "relative"
    } : undefined;


    return (
        <Box ref={setNodeRef} style={style} {...listeners} {...attributes} >
            <Card key={card.id} sx={{ marginBottom: 2 }}>
                <CardContent sx={{ paddingRight: 10 }}>
                    {activeCard === card.id
                        ? (
                            <Box >
                                <TextField fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Actualiza card"
                                    value={updateCardText}
                                    onChange={(e) => setUpdateCardText(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") onUpdateTitleCard(card) }}
                                    autoFocus
                                    sx={{ marginBottom: 1 }}
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => onUpdateTitleCard(card)}>
                                    Editar
                                </Button>
                            </Box>
                        ) : <Box display="flex" alignItems="center">
                            <Checkbox
                                checked={card.isComplete}
                                onChange={(e) => onUpdateCompleteCard(e.target.checked, card)}
                            />
                            <Typography
                                onClick={() => onActiveCard(card)}
                                sx={{ cursor: "pointer" }}>
                                {card.title}
                            </Typography>
                        </Box>}
                </CardContent>
                <IconButton
                    size="small"
                    onClick={(e) => onMenuClick(e, card)}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <GridMoreVertIcon />
                </IconButton>
            </Card>
        </Box>

    );
}
