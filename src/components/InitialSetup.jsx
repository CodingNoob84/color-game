import useColorStore from "@/store/ColorStore";
import React from "react";

function InitialSetup() {
  const { generateRandomColors } = useColorStore();
  return (
    <div className="flex justify-center items-center">
      <div className="border rounded-md w-[800px] h-[200px] flex justify-center items-center flex-col p-5 gap-5">
        <div>
          {" "}
          Guess right order of given colors from left to right. Drag each colors
          from Colors Container to Each Try Container. You can switch colors
          within Try Container. Once we guessed sequence of all six colors in
          Try Container. Click Check Button to know how many colors are placed
          at right index place. You have five chances to try.
        </div>
        <div
          className="border rounded-md p-2 cursor-pointer hover:bg-green-700"
          onClick={() => generateRandomColors()}
        >
          Lets Play
        </div>
      </div>
    </div>
  );
}

export default InitialSetup;
