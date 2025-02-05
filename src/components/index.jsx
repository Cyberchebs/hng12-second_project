import { useContext, useEffect } from "react";
import { GameContext } from "../context";
import { MdRestartAlt } from "react-icons/md";

const ColorGuessingGame = () => {
  const {
    generateNewGame,
    score,
    resetGame,
    gameStatus,
    handleColorSelect,
    colorOptions,
    targetColor,
  } = useContext(GameContext);
  // Initialize game
  useEffect(() => {
    generateNewGame();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Guess The <span className="text-6xl text-gradient">COLOR</span>
        </h1>
        <div className="flex justify-between items-center mb-4 mt-20">
          <div className="text-lg font-semibold">Score: {score}</div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-black rounded hover:bg-white hover:scale-110 transition-all cursor-pointer"
          >
            New Game
            <MdRestartAlt size={20} />
          </button>
        </div>
      </div>

      {/* Target Color Display */}
      <div
        className="w-full h-32 rounded-lg mb-6 mt-4"
        style={{ backgroundColor: targetColor }}
      />

      {/* Game Status */}
      {gameStatus && (
        <div
          className={`text-center mb-4 font-semibold ${
            gameStatus === "Right guess!"
              ? "text-green-500 vibrateUpDown"
              : "text-red-500 vibrate   "
          }`}
        >
          {gameStatus}
        </div>
      )}

      {/* Color Options */}
      <div className="grid grid-cols-3 gap-4">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className="w-full h-20 rounded-lg hover:opacity-90 transition-all transform hover:scale-110 cursor-pointer "
            style={{ backgroundColor: color }}
            onClick={() => {
              handleColorSelect(color);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorGuessingGame;
