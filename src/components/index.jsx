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
    <div className="max-w-md mx-auto p-6  rounded-lg md:mt-40 lg:mt-0 ">
      <div className="text-center mb-6">
        <h1 data-testid="gameInstructions" className="text-4xl font-bold mb-4">
          Guess The right <span className="text-6xl text-gradient">COLOR</span>
        </h1>
        <div className="flex justify-between items-center mb-4 mt-20">
          <div className="text-lg font-semibold" data-testid="score">
            Score: {score}
          </div>
          <button
            data-testid="newGameButton"
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-black rounded hover:bg-white hover:scale-110 transition-all cursor-pointer"
          >
            New Game
            <MdRestartAlt size={20} />
          </button>
        </div>
      </div>

      <div
        className="w-full h-32 rounded-lg mb-6 mt-4"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      />
      {gameStatus && (
        <div
          data-testid="gameStatus"
          className={`text-center mb-4 font-semibold ${
            gameStatus === "Right guess!"
              ? "text-green-500 vibrateUpDown"
              : "text-red-500 vibrate   "
          }`}
        >
          {gameStatus}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {colorOptions.map((color, index) => (
          <button
            data-testid="colorOption"
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
