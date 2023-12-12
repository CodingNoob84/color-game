"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";

function Box({ id, active, children }) {
  console.log(id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform,
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
}

export default Box;
