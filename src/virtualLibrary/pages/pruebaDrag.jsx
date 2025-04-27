import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { DroppableCardList } from '../components/DroppableCardList';
import { DraggableCard } from '../components/DraggableCard';




export const PruebaDrag = () => {
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <DraggableCard id="draggable">Drag me</DraggableCard>
    );

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <DroppableCardList key={id} id={id}>
                    {parent === id ? draggableMarkup : 'Drop here'}
                </DroppableCardList>
            ))}
        </DndContext>
    );


}


