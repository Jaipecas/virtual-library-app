import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Box, Button, Card, CardContent, Checkbox, Grid2, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"

export function DroppableCardList({ id, cardList, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
        data: cardList,
    });
    const style = {
        color: isOver ? 'red' : undefined,
    };

    return (
        <Box ref={setNodeRef} style={style} position={"relative"}>
            {children}
        </Box>

    );
}