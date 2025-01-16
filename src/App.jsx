import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GameGrid from "./components/GameGrid";

function App() {
  const [mines, setMines] = useState(4); // Default number of mines
  const [amount, setAmount] = useState(0.01); // Default bet amount
  const [gameState, setGameState] = useState("idle"); // idle, playing, ended
  const [revealed, setRevealed] = useState([]); // Tracks revealed boxes
  const [minePositions, setMinePositions] = useState([]);

  const handleStartGame = () => {
    const positions = new Set();
    while (positions.size < mines) {
      positions.add(Math.floor(Math.random() * 25));
    }
    setMinePositions([...positions]);
    setGameState("playing");
    setRevealed([]); // Reset revealed boxes
  };


  return (
    <div className="bg-[#232626] text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center p-4 bg-[#2c2d2e] rounded-t-lg">

          <span className="text-gray-400 text-sm">
            {gameState === "playing"
              ? "Game in progress..." : gameState === "idle" ? "Start the game"
                : "Game result will be displayed"}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex bg-gray-800 rounded-b-lg flex-col-reverse custom:flex-row">
          {/* Sidebar */}
          <Sidebar
            mines={mines}
            setMines={setMines}
            amount={amount}
            setAmount={setAmount}
            onBet={handleStartGame}
          />

          {/* Game Grid */}
          <GameGrid
            gameState={gameState}
            minePositions={minePositions}
            revealed={revealed}
            setRevealed={setRevealed}
            setGameState={setGameState}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-[#2c2d2e] rounded-lg rounded-t-none">
          <div className="flex items-center space-x-4 text-gray-400">
            <span className=" flex items-center justify-center sm:block font-bold"><i class="fa-solid text-gray-500 fa-star"></i> 20806</span>
            <span className=" flex items-center justify-center sm:block font-bold"><i class="fa-solid text-gray-500 fa-heart"></i> 20845</span>
          </div>
          <div className="flex items-center space-x-4">

            <i class="fa-solid fa-clapperboard text-gray-400 hover:text-white"></i>
            <i class="fa-solid fa-music text-gray-400 hover:text-white"></i>
            <i class="fa-solid text-gray-400 hover:text-white fa-volume-low"></i>
            <i class="fa-solid text-gray-400 hover:text-white fa-chart-column"></i>
            <i class="fa-regular text-gray-400 hover:text-white fa-circle-question"></i>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
