import useColorStore from "@/store/ColorStore";
import React from "react";

function InitialSetup() {
  const { generateRandomColors } = useColorStore();
  return (
    <div className="flex justify-center items-center">
      <div
        className="border rounded-md p-2 cursor-pointer"
        onClick={() => generateRandomColors()}
      >
        Generate Colors
      </div>
    </div>
  );
}

export default InitialSetup;
