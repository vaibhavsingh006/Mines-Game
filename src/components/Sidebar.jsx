import React, { useEffect } from "react";
import "../style/custom-tailwind.css";
import ind from "../assets/inr.webp"

const Sidebar = ({ mines, setMines, amount, setAmount, onBet, gameState }) => {
    useEffect(() => {

        const slider = document.querySelector(".range-custom");
        if (slider) {
            const percentage = ((mines - 4) / (24 - 4)) * 100;
            slider.style.setProperty("--value", `${percentage}%`);
        }
    }, [mines]);

    const handleMinesChange = (e) => {
        const value = parseInt(e.target.value);
        setMines(value);


        const slider = e.target;
        const percentage = ((value - 4) / (24 - 4)) * 100;
        slider.style.setProperty("--value", `${percentage}%`);
    };

    return (
        <div className="w-full pb-6 space-y-6 bg-[#323738] custom:w-[28%]">
            <div className="flex justify-between items-center">
                <button className=" py-4 w-full font-bold text-sm  border-b border-green-500">
                    Manual
                </button>
                <button className="w-full py-4 font-bold text-gray-400 text-sm hover:text-white">
                    Auto
                </button>
            </div>
            {/* Amount Section */}
            <div className="!m-0 p-4">
                <label className="block text-sm text-gray-400 font-bold mb-2">Amount</label>
                <div className="flex items-center space-x-2 bg-[#2c2d2e] p-[3px] pl-2 rounded border border-transparent focus-within:border-green-500 transition-all duration-300 ease-in-out">
                    <img className=" object-contain h-4" src={ind} alt="INR" />
                    <input
                        type="number"
                        className="bg-transparent text-white text-sm w-full focus:outline-none"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    />
                    <button className="flex items-center justify-center p-[2px_8px] bg-[#444c4d] rounded font-semibold">1/2</button>
                    <button className="flex items-center !ml-1 justify-center p-[2px_8px] bg-[#444c4d] rounded font-semibold">2x</button>
                </div>
                <div className=" flex items-center justify-between mt-1 gap-2">
                    <button className="flex items-center opacity-40 justify-center cursor-not-allowed w-full py-[5px] text-sm bg-[#404242] rounded font-semibold">1/2</button>
                    <button className="flex items-center opacity-40 justify-center cursor-not-allowed w-full py-[5px] text-sm bg-[#404242] rounded font-semibold">1/2</button>
                    <button className="flex items-center opacity-40 justify-center cursor-not-allowed w-full py-[5px] text-sm bg-[#404242] rounded font-semibold">1/2</button>
                    <button className="flex items-center opacity-40 justify-center cursor-not-allowed w-full py-[5px] text-sm bg-[#404242] rounded font-semibold">1/2</button>
                </div>
            </div>

            {/* Mines Slider */}
            <div className="!m-0 p-4">
                <label className="block text-sm text-gray-400 font-bold mb-2">Mines</label>
                <div className="bg-[#2c2d2e] px-3 py-2 rounded-lg flex items-center justify-center">
                    <span className=" mr-2 font-semibold">{mines}</span>
                    <input
                        type="range"
                        min="4"
                        max="24"
                        value={mines}
                        onChange={handleMinesChange}
                        className="range-custom"
                    />
                    <span className=" ml-2 font-semibold text-gray-400">24</span>
                </div>
            </div>

            {/* Bet Button */}
            <button
                onClick={onBet}
                disabled={gameState === "playing"}
                className={`w-[-webkit-fill-available] m-4 py-2 rounded text-center font-bold ${gameState === "playing"
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#24ee89] to-[#9fe871] text-black"
                    }`}
                style={{
                    boxShadow:
                        gameState === "playing"
                            ? "none"
                            : "0 0 12px #23ee884d, 0 -2px #1dca6a inset",
                }}
            >
                Bet
            </button>
        </div>
    );
};

export default Sidebar;

