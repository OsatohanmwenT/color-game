import {useState, useEffect} from 'react'

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
};

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0)
  const [message, setMessage] = useState("Guess the correct color!");
  const [error, setError] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newTargetColor = getRandomColor();
    const randomColors = Array.from({ length: 5 }, getRandomColor);
    const options = [...randomColors, newTargetColor].sort(() => Math.random() - 0.5); // Shuffle
    setTargetColor(newTargetColor);
    setColorOptions(options);
    setMessage("");
  };

let timer;
const handleGuess = (color) => {
  clearTimeout(timer);
  if (color === targetColor) {
    setMessage("Correct! 🎉");
    setStreak((prev) => prev + 1);
    setScore((prev) => prev + 1);
    setError(false);
    timer = setTimeout(resetGame, 1000);
  } else {
    setMessage("Wrong! Try again. 😊");
    setStreak(0);
    setError(true);
  }
};

  const newGame = () => {
    setScore(0);
    setStreak(0);
    setMessage("");
    resetGame();
  }

  return (
    <main className="container">
      <div className="game-card">
        <h1 className="title">Color Game</h1>
        <h2 className="sub-title" data-testid="gameInstructions">
          Guess the correct color!
        </h2>
        <div className='flex'>
          <div className="score">
            <p data-testid="score">
              Score: {score}
            </p>
          </div>
          <div className="score">
            <p>
              Streak: {streak}
            </p>
          </div>
        </div>
       <p className={`${error && "error"} message`} data-testid="gameStatus">
          {message}
        </p>
        <div
          className="main-color"
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        ></div>
        <div className="color-container">
        {colorOptions.map((color) => (
          <button
            key={color}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOptions"
          >
            <span className="sr-only" aria-label='color option'>{color}</span>
          </button>
        ))}
        </div>
        <button className="btn"
        onClick={newGame}
          data-testid="newGameButton"
        >
          New Game
        </button>
      </div>
    </main>
  );
}

export default App