import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GameGrid from "./components/GameGrid";

function App() {
  const [mines, setMines] = useState(4);
  const [amount, setAmount] = useState(0.01);
  const [gameState, setGameState] = useState("idle");
  const [revealed, setRevealed] = useState([]);
  const [minePositions, setMinePositions] = useState([]);

  const handleStartGame = () => {
    const positions = new Set();
    while (positions.size < mines) {
      positions.add(Math.floor(Math.random() * 25));
    }
    setMinePositions([...positions]);
    setGameState("playing");
    setRevealed([]);
  };

  const handleEndGame = (result) => {
    setGameState("ended");
  };

  return (
    <div className="bg-[#232626] text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center p-4 bg-[#2c2d2e] rounded-t-lg">
          <span className="text-gray-400 text-sm">
            {gameState === "playing"
              ? "Game in progress..."
              : gameState === "idle"
                ? "Start the game"
                : "Game result will be displayed"}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex bg-gray-800 rounded-b-lg flex-col-reverse custom:flex-row">
          <Sidebar
            mines={mines}
            setMines={setMines}
            amount={amount}
            setAmount={setAmount}
            onBet={handleStartGame}
            gameState={gameState}
          />

          {/* Game Grid */}
          <GameGrid
            gameState={gameState}
            minePositions={minePositions}
            revealed={revealed}
            setRevealed={setRevealed}
            setGameState={setGameState}
            onEndGame={handleEndGame}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-[#2c2d2e] rounded-lg rounded-t-none">
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex flex-col items-center justify-center sm:block font-bold">
              <i className="fa-solid text-gray-500 fa-star"></i> 20806
            </span>
            <span className="flex flex-col items-center justify-center sm:block font-bold">
              <i className="fa-solid text-gray-500 fa-heart"></i> 20845
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-clapperboard text-gray-400 hover:text-white"></i>
            <i className="fa-solid fa-music text-gray-400 hover:text-white"></i>
            <i className="fa-solid text-gray-400 hover:text-white fa-volume-low"></i>
            <i className="fa-solid text-gray-400 hover:text-white fa-chart-column"></i>
            <i className="fa-regular text-gray-400 hover:text-white fa-circle-question"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
