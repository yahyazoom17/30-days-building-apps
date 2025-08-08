import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import { getMoverFromAI } from "./utils/aiOpenRouter";
import { checkWinner } from "./utils/winner";
const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [gameMode, setGameMode] = useState("Medium");
  const [isGameModeSet, setIsGameModeSet] = useState(false);
  const [thinking, setThinking] = useState(false);

  const handleClick = (i) => {
    if (!isPlayTurn || board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (winner) return;

    const result = checkWinner(board);

    if (result?.winner) {
      setWinner(result.winner);
      if (result?.winner === "X" || result?.winner === "O") {
        setScore((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1,
        }));

        return;
      }
    }
    if (!isPlayTurn && !winner) {
      setThinking(true);
      const aiTurn = async () => {
        const move = await getMoverFromAI(board, score, gameMode);
        console.log(move);
        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setThinking(false);
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      };
      const timeout = setTimeout(aiTurn, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayTurn, winner, score, setThinking, gameMode]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setIsGameModeSet(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">TIC-TAC-TAI 🤖</h1>
      <ScoreBoard score={score} />
      <GameBoard
        board={board}
        handleClick={handleClick}
        gameMode={gameMode}
        setGameMode={setGameMode}
        isGameModeSet={isGameModeSet}
        setIsGameModeSet={setIsGameModeSet}
        thinking={thinking}
      />
      {winner && (
        <div>
          <p className="font-medium my-5 text-center text-xl">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
          </p>
          <button
            onClick={restartGame}
            className="bg-[#1e293b] py-2 px-3 font-medium"
          >
            Play again!
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
