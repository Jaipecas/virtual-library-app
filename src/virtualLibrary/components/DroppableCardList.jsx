import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Box, Button, Card, CardContent, Checkbox, Grid2, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"

export function DroppableCardList(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
        data: props.data,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <Box ref={setNodeRef} style={style} position={"relative"}>
            {props.children}
        </Box>

    );
}