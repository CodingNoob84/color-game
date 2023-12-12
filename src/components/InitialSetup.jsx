import useColorStore from "@/store/ColorStore";
import React from "react";

function InitialSetup() {
  const { generateRandomColors } = useColorStore();
  return (
    <div className="flex justify-center items-center">
      <div className="border rounded-md w-96 h-32 flex justify-center items-center flex-col p-5 gap-5">
        <div>
          {" "}
          Guess right order of given colors from left to right. You have five
          chances to try.
        </div>
        <div
          className="border rounded-md p-2 cursor-pointer hover:bg-emerald-400"
          onClick={() => generateRandomColors()}
        >
          Lets Play
        </div>
      </div>
    </div>
  );
}

export default InitialSetup;
