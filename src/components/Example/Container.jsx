"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Box from "./Box";

const items = ["Item1", "Item2", "Item3", "Item4"];

function Container() {
  const [activeId, setActiveId] = useState(null);
  const [itemsState, setItemsState] = useState(items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id) {
      setActiveId(active.id);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id && over) {
      const oldIndex = itemsState.indexOf(active.id);
      const newIndex = itemsState.indexOf(over.id);
      setItemsState((items) => arrayMove(items, oldIndex, newIndex));
      setActiveId(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemsState} strategy={closestCenter}>
        <div className="flex">
          {itemsState.map((id) => (
            <Box key={id} id={id} active={activeId === id}>
              {id}
            </Box>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default Container;
