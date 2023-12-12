"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

function ColorBall({ id, color, bgcolor, container }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${container}-${id}`,
    data: {
      container,
      index: id,
      color: color,
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`border w-12 h-12 rounded-full`}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default ColorBall;
