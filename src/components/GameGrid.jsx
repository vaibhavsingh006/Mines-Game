import React, { useState, useEffect } from "react";
import topRight from "../assets/top-right.webp"
import topLeft from "../assets/top-left.webp"
// import bg from "../assets/bg-mines.png"
import dimond from "../assets/dimond.webp"
import mines from "../assets/mines.webp"

const GameGrid = ({ gameState, minePositions, revealed, setRevealed, setGameState }) => {
    // Track the user's clicks
    const [userClicks, setUserClicks] = useState([]);

    // Reset game states when the game starts over
    useEffect(() => {
        if (gameState === "playing") {
            setUserClicks([]);  // Reset previous user clicks when the game is restarted
            setRevealed([]);  // Reset revealed tiles when the game starts
        }
    }, [gameState, setRevealed]);

    // Handle tile click event
    const handleClick = (index) => {
        // Don't do anything if the game is over or if the tile is already revealed
        if (gameState !== "playing" || revealed.includes(index)) return;

        // If it's a mine, end the game and reveal all tiles
        if (minePositions.includes(index)) {
            setGameState("ended");
            setRevealed([...Array(25).keys()]); // Reveal all tiles
        } else {
            // Otherwise, reveal the clicked tile
            setRevealed((prevRevealed) => [...prevRevealed, index]);
        }

        // Track the user's click
        setUserClicks((prevClicks) => [...prevClicks, index]);
    };

    const tiles = Array(25).fill(0); // Array for 25 grid items

    return (
        <div className={`relative flex-1 bg-cover py-[30px] custom:p-0 bg-center h-screen bg-[url('/bg-mines.png')] flex items-center justify-center `}>

            <div className="-webkit-fill-available">
                {/* Wrapper for Grid */}
                <div className="bg-[#2c2d2e] p-3 sm:p-4 relative rounded-lg mx-auto sm:w-[467px]" style={{ width: "fit-content", height: "fit-content" }}>
                    {/* Top Left Sticker */}
                    <div className="absolute top-0 h-[14px] left-[12px]">
                        <img src={topLeft} alt="Sticker" className="w-full h-full" />
                    </div>
                    {/* Top Right Sticker */}
                    <div className="absolute h-[50px] z-10 -top-[25px] right-0">
                        <img src={topRight} alt="Sticker" className="w-full h-full" />
                    </div>
                    {/* Parent Div */}
                    <div className="grid grid-cols-5 gap-[6px] sm:gap-2 w-full h-full">
                        {tiles.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={` w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg cursor-pointer
                                ${userClicks.includes(index) // If the tile is clicked by the user, make it blue
                                        ? minePositions.includes(index)
                                            ? "bg-[#1e2121]" // If the clicked tile contains a mine, set to this color
                                            : "bg-[#7d40cf]"
                                        : revealed.includes(index)
                                            ? "bg-[#1e2121]" // Regular revealed tile
                                            : "bg-[#444c4d] opacity-100" // Unrevealed tile#1e2121
                                    }
                                ${gameState === "ended" && !revealed.includes(index) // Unrevealed tiles after game over, show pink
                                        ? "bg-pink-500"
                                        : ""}
                                ${gameState === "idle" || "playing" && !userClicks.includes(index) && !revealed.includes(index) // Only enable hover when the game is playing and tile isn't clicked/revealed
                                        ? "hover:bg-[#545f60] transition"
                                        : ""}
                                `}
                            >
                                {/* Icon Display */}
                                {revealed.includes(index) && (
                                    // <span>{minePositions.includes(index) ? "💣" : "💎"}</span>
                                    <span className="flex items-center justify-center">
                                        {minePositions.includes(index) ? (
                                            <img src={mines} alt="Bomb" className={`w-[94px] h-[94px] object-contain sm:object-cover ${!userClicks.includes(index) ? "opacity-50" : ""}`} />
                                        ) : (
                                            <img src={dimond} alt="Diamond" className={`w-[75px] object-contain sm:object-fill h-[62px] ${!userClicks.includes(index) ? "opacity-50" : ""}`} />
                                        )}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameGrid;
