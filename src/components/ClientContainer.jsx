"use client";
import useColorStore from "@/store/ColorStore";
import React from "react";
import PrevContianer from "./PrevContianer";
import ClientDNDContainer from "./ClientDNDContainer";
import InitialSetup from "./InitialSetup";

const getLastAndRemaining = (arr) => {
  const lastIndex = arr.length - 1;
  const lastObject = arr[lastIndex];
  const remainingArray = arr.slice(0, lastIndex);
  return { lastObject, remainingArray };
};

function ClientContainer() {
  const { RandomColorsArray, UserGeneratedColors } = useColorStore();
  const { lastObject, remainingArray } =
    getLastAndRemaining(UserGeneratedColors);
  console.log(remainingArray);
  console.log("lastobject", lastObject);
  return (
    <div className="mt-28">
      {RandomColorsArray.length === 0 ? (
        <InitialSetup />
      ) : (
        <>
          <PrevContianer prevarray={remainingArray} />
          <ClientDNDContainer newobj={lastObject} />
        </>
      )}
    </div>
  );
}

export default ClientContainer;
