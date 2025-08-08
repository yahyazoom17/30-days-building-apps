import React from "react";

const ScoreBoard = ({ score }) => {
  return (
    <div className="flex justify-between w-[300px] mb-4 text-lg font-semibold">
      <div className="text-[#38bdf8]">You (X) : {score.X}</div>
      <div className="text-[#f472b6]">AI (O) : {score.O}</div>
    </div>
  );
};

export default ScoreBoard;
