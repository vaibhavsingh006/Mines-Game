import React, { useState, useEffect, useRef } from "react";
import topRight from "../assets/top-right.webp";
import topLeft from "../assets/top-left.webp";
import dimond from "../assets/dimond.webp";
import mines from "../assets/mines.webp";
import star from "../assets/download.png";
import "../style/custom-tailwind.css";

const GameGrid = ({ gameState, minePositions, revealed, setRevealed, setGameState }) => {
    const [userClicks, setUserClicks] = useState([]);
    const [explosions, setExplosions] = useState([]);

    // Audio references
    const diamondSoundRef = useRef(null);
    const explosionSoundRef = useRef(null);

    useEffect(() => {
        if (gameState === "playing") {
            setUserClicks([]);
            setRevealed([]);
            setExplosions([]);
        }
    }, [gameState, setRevealed]);

    const handleClick = (index) => {
        if (gameState !== "playing" || revealed.includes(index)) return;

        if (minePositions.includes(index)) {
            setGameState("ended");
            setRevealed([...Array(25).keys()]);
            setExplosions((prev) => [...prev, index]);


            explosionSoundRef.current.play();
        } else {
            setRevealed((prevRevealed) => [...prevRevealed, index]);


            diamondSoundRef.current.play();
        }

        setUserClicks((prevClicks) => [...prevClicks, index]);
    };

    const tiles = Array(25).fill(0);

    return (
        <div className="relative flex-1 bg-cover py-[30px] custom:p-0 bg-center h-screen bg-[url('/bg-mines.png')] flex items-center justify-center ">
            <img src={star} alt="star" className="absolute bottom-[6%] right-[5%] sm:bottom-[12%]  sm:right-[8%] animate-growShrink2" />
            <img src={star} alt="star" className="absolute top-[4%] sm:bottom-[20%] right-[20%] animate-growShrink" />
            <img src={star} alt="star" className="absolute top-[8%] left-[2%] sm:bottom-[20%] sm:left-[20%] animate-growShrink" />
            <img src={star} alt="star" className="absolute bottom-[4%] left-[2%] sm:bottom-[12%] sm:left-[8%] animate-growShrink2 opacity-70" />
            <div className="-webkit-fill-available">
                <div
                    className="bg-[#2c2d2e] p-3 sm:p-4 relative rounded-lg mx-auto sm:w-[467px]"
                    style={{ width: "fit-content", height: "fit-content" }}
                >
                    <div className="absolute top-0 h-[14px] left-[12px]">
                        <img src={topLeft} alt="Sticker" className="w-full h-full" />
                    </div>
                    <div className="absolute h-[36px] -top-[16px] sm:h-[50px] z-10 sm:-top-[25px] right-0">
                        <img src={topRight} alt="Sticker" className="w-full h-full" />
                    </div>
                    <div className="grid grid-cols-5 gap-[6px] sm:gap-2 w-full h-full">
                        {tiles.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`relative w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg cursor-pointer
                                ${userClicks.includes(index)
                                        ? minePositions.includes(index)
                                            ? "bg-[#1e2121]"
                                            : "bg-[#7d40cf]"
                                        : revealed.includes(index)
                                            ? "bg-[#1e2121]"
                                            : "bg-[#444c4d] opacity-100"
                                    }
                                ${gameState === "ended" && !revealed.includes(index) ? "bg-pink-500" : ""}
                                ${gameState === "idle" ||
                                        ("playing" && !userClicks.includes(index) && !revealed.includes(index))
                                        ? "hover:bg-[#545f60] transition"
                                        : ""
                                    }
                                `}
                            >
                                {revealed.includes(index) && (
                                    <span className="flex items-center justify-center">
                                        {minePositions.includes(index) ? (
                                            <img
                                                src={mines}
                                                alt="Bomb"
                                                className={`w-[94px] h-[94px] object-contain sm:object-cover ${!userClicks.includes(index) ? "opacity-50" : ""
                                                    }`}
                                            />
                                        ) : (
                                            <img
                                                src={dimond}
                                                alt="Diamond"
                                                className={`w-[75px] object-contain sm:object-fill h-[62px] ${!userClicks.includes(index) ? "opacity-50" : ""
                                                    }`}
                                            />
                                        )}
                                    </span>
                                )}

                                {explosions.includes(index) && (
                                    <div
                                        className="animate-explosion"
                                        onAnimationEnd={() => {
                                            setExplosions((prev) =>
                                                prev.filter((i) => i !== index)
                                            ); // Remove explosion after animation
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Audio elements */}
            <audio ref={diamondSoundRef} src="/sounds/sound_gems.mp3" />
            <audio ref={explosionSoundRef} src="/sounds/sound_mines.mp3" />
        </div>
    );
};

export default GameGrid;
