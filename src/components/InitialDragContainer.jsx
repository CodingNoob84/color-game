import React from "react";
import ColorBall from "./ColorBall";
import useColorStore from "@/store/ColorStore";

function InitialDragContainer() {
  const { InitialColors } = useColorStore();
  return (
    <div className="grid h-full grid-cols-6 mx-auto max-w-md">
      {InitialColors.map((col) => (
        <div
          key={`init-${col.id}`}
          className="flex justify-center items-center"
        >
          <ColorBall
            id={col.id}
            color={col.color}
            bgcolor={`bg-${col.color}-400`}
            container={"0"}
          />
        </div>
      ))}
    </div>
  );
}

export default InitialDragContainer;
