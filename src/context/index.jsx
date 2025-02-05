import { createContext } from "react";
import { useState } from "react";

export const GameContext = createContext(null);

export default function GameState({ children }) {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  // Generate a random color in hex format
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate new set of colors including the target
  const generateNewGame = () => {
    const newTargetColor = generateRandomColor();
    const newOptions = [newTargetColor];

    while (newOptions.length < 6) {
      const newColor = generateRandomColor();
      if (!newOptions.includes(newColor)) {
        newOptions.push(newColor);
      }
    }

    // Shuffle the options
    for (let i = newOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
    }

    setTargetColor(newTargetColor);
    setColorOptions(newOptions);
    setGameStatus("");
  };

  // Handle color selection
  const handleColorSelect = selectedColor => {
    if (selectedColor === targetColor) {
      setScore(score + 1);
      setGameStatus("Right guess!");
      setTimeout(generateNewGame, 1000);
    } else {
      setGameStatus("Wrong guess!");
      // Generate new colors after a short time when wrong
      setTimeout(generateNewGame, 1000);
    }
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    generateNewGame();
  };

  return (
    <GameContext.Provider
      value={{
        generateNewGame,
        score,
        resetGame,
        gameStatus,
        handleColorSelect,
        colorOptions,
        targetColor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
