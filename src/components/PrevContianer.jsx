import React from "react";

export const getOrdinalString = (index) => {
  const ordinals = ["first", "second", "third", "fourth", "fifth", "answer"]; //
  if (index >= 1 && index <= ordinals.length) {
    return ordinals[index - 1];
  } else {
    return null; // or handle the out-of-bounds case according to your needs
  }
};

function PrevContianer({ prevarray }) {
  return (
    <div>
      {prevarray.map((prev, i) => (
        <div key={prev.id} className="my-5">
          <div className="flex justify-center items-center">
            <div className="relative m-5 w-full h-24 max-w-md  rounded-full bg-gray-700 border-gray-600">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border bg-slate-600 text-sm rounded-full w-24 text-center">
                {`${getOrdinalString(prev.id)} try`}
              </div>
              <div className="grid h-full grid-cols-6 mx-auto max-w-md">
                {prev.colors.map((col) => (
                  <div
                    key={`prev${prev.id}-${col.id}`}
                    className="flex justify-center items-center"
                  >
                    <div
                      className={`border w-12 h-12 rounded-full`}
                      style={{ backgroundColor: col.color }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>{`matching colors: ${prev.matching}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrevContianer;
