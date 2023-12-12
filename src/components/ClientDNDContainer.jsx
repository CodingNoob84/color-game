"use client";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import DropContainer from "./DropContainer";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ColorBall from "./ColorBall";
import SortableColors from "./SortableColors";
import InitialDragContainer from "./InitialDragContainer";
import useColorStore from "@/store/ColorStore";

export default function ClientDNDContainer({ newobj }) {
  //const { UserGeneratedColors, getUGColorsByTries } = useColorStore();
  const [colorsArrayId, setColorsArrayId] = useState(newobj.id);
  const [colorsArray, setColorsArray] = useState(newobj.colors);
  const [activeColor, setActiveColor] = useState(null);
  const [overColor, setOverColor] = useState(null);
  const [activeContainerId, setActiveContainerId] = useState("");
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateColorById = (id, newColor) => {
    setColorsArray((prevColors) => {
      // Check if the newColor is present in any other element and empty their color
      const updatedColors = prevColors.map((color) =>
        color.color === newColor ? { ...color, color: "" } : color
      );

      // Update the color of the specified id
      return updatedColors.map((color) =>
        color.id === id ? { ...color, color: newColor } : color
      );
    });
  };

  const swapColorsById = (id1, id2) => {
    setColorsArray((prevColors) => {
      // Find the elements with the specified ids
      const color1 = prevColors.find((color) => color.id === id1);
      const color2 = prevColors.find((color) => color.id === id2);

      // If both colors are found, swap their color values
      if (color1 && color2) {
        const updatedColors = prevColors.map((color) => {
          if (color.id === id1) {
            return { ...color, color: color2.color };
          } else if (color.id === id2) {
            return { ...color, color: color1.color };
          } else {
            return color;
          }
        });

        return updatedColors;
      }

      // If any of the ids is not found, return the original array
      return prevColors;
    });
  };

  const handleDragStart = ({ active }) => {
    //console.log("drag-started", active);
    //setActiveColor(active.data.current);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over) {
      const ActiveContainer = active.data.current.container;
      const ActiverColor = active.data.current.color;
      const ActiverId = active.data.current.index;
      const OverContainer = over.data.current.container;
      const OverColor = over.data.current.color;
      const OverId = over.data.current.index;
      if (ActiveContainer === "0") {
        updateColorById(OverId, ActiverColor);
      } else {
        swapColorsById(ActiverId, OverId);
      }
    }
  };

  useEffect(() => {
    setColorsArray(newobj.colors);
    setColorsArrayId(newobj.id);
  }, [newobj.colors, newobj.id]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mb-48">
        <DropContainer
          id={colorsArrayId}
          colorsArray={colorsArray}
          className="mb-24"
        />
      </div>
      <div className="mt-24 w-full h-2"></div>
      <div className="fixed z-50 w-full h-20 max-w-md -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <InitialDragContainer />
      </div>
    </DndContext>
  );
}
