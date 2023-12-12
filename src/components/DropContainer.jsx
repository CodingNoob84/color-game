"use client";
import React, { useState } from "react";
import ColorBall from "./ColorBall";
import { useDroppable } from "@dnd-kit/core";
import SortableColors from "./SortableColors";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import useColorStore from "@/store/ColorStore";
import { getOrdinalString } from "./PrevContianer";

function DropContainer({ id, colorsArray }) {
  //console.log("dropcontainer", colorsArray);
  const [matching, setMatching] = useState(null);
  const { getMatchingColors, IncreamentUGColorsArray } = useColorStore();
  const allColorsHaveValue = colorsArray.every((item) => item.color !== "");
  const handleCheck = () => {
    if (allColorsHaveValue) {
      setMatching(getMatchingColors(id, colorsArray));
      IncreamentUGColorsArray();
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div
          className={`relative m-5 w-full h-24 max-w-md bg-white border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600  ${
            getOrdinalString(id) === "answer" && "shadow-md shadow-green-400"
          }`}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border bg-slate-400 text-sm rounded-full w-20 text-center">
            {getOrdinalString(id) === "answer"
              ? "Answer"
              : `${getOrdinalString(id)} try`}
          </div>

          <div
            //ref={setNodeRef}
            className="grid h-full grid-cols-6 mx-auto max-w-md"
          >
            {colorsArray.map((col, i) => (
              <SortableColors
                key={i}
                id={col.id}
                color={col.color}
                container={id}
              >
                <ColorBall
                  id={col.id}
                  color={col.color}
                  bgcolor={`bg-${col.color}-400`}
                  container={id}
                />
              </SortableColors>
            ))}
          </div>
          {/* </SortableContext> */}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div onClick={() => handleCheck()}>Check</div>
        {/* <div>Matching Colors:3</div> */}
      </div>
    </div>
  );
}

export default DropContainer;
