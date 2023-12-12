"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const SortableColors = ({ children, id, color, container }) => {
  const { setNodeRef } = useDroppable({
    id: `${container}-${id}`,
    data: {
      container,
      index: id,
      color: color,
    },
  });

  return (
    <div className="flex justify-center items-center" ref={setNodeRef}>
      {children}
    </div>
  );
};

export default SortableColors;
