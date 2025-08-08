import React from "react";
import Square from "./Square";

const GameBoard = ({
  board,
  handleClick,
  gameMode,
  setGameMode,
  thinking,
  isGameModeSet,
  setIsGameModeSet,
}) => {
  return (
    <div>
      <div className={`text-lg font-medium text-center my-3`}>
        {isGameModeSet ? `Game Mode: ${gameMode}` : `Select Game Mode`}
      </div>
      {!isGameModeSet && (
        <div className="flex flex-row gap-2 justify-center items-center mb-5 max-w-[300px]">
          <button
            onClick={() => {
              if (!isGameModeSet) {
                setGameMode("Easy");
                setIsGameModeSet(true);
              }
            }}
            className={`bg-[#1e293b] py-2 px-3 font-medium w-full active:border-2`}
          >
            Easy
          </button>
          <button
            onClick={() => {
              if (!isGameModeSet) {
                setGameMode("Medium");
                setIsGameModeSet(true);
              }
            }}
            className={`bg-[#1e293b] py-2 px-3 font-medium w-full active:border-2`}
          >
            Medium
          </button>
          <button
            onClick={() => {
              if (!isGameModeSet) {
                setGameMode("Hard");
                setIsGameModeSet(true);
              }
            }}
            className={`bg-[#1e293b] py-2 px-3 font-medium w-full active:border-2`}
          >
            Hard
          </button>
        </div>
      )}
      {isGameModeSet && (
        <div
          className={`text-lg font-medium text-center my-5 ${
            thinking ? `text-[#f472b6]` : `text-[#38bdf8]`
          }`}
        >
          {thinking ? "AI is thinking..." : "Your turn!"}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 w-[300px] h-[300px] mt-5">
        {board.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
