import React, { useState, useEffect } from 'react';

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 6;

  const getRandomWord = async () => {
    try {
      const response = await fetch("http://localhost:8000/random_word"); 
      const data = await response.json();
      setWordToGuess(data.word.toUpperCase());
    } catch (error) {
      console.error("Error fetching the random word:", error);
      alert("Failed to fetch the word. Please try again later.");
    }
  };


  const startNewGame = async () => {
    setCurrentGuess("");
    setGuesses([]);
    setFeedback([]);
    setGameOver(false);
    await getRandomWord(); 
  };

  const handleGuess = () => {
    const sanitizedGuess = currentGuess.trim().toUpperCase(); 
    
    if (sanitizedGuess.length !== 5) {
      alert("Guess must be 5 letters");
      return;
    }

    const newFeedback = sanitizedGuess.split("").map((char, index) => {
      if (char === wordToGuess[index]) {
        return "correct";
      } else if (wordToGuess.includes(char)) {
        return "present";
      } else {
        return "absent";
      }
    });

    const newGuesses = [...guesses, sanitizedGuess];
    setGuesses(newGuesses);
    setFeedback([...feedback, newFeedback]);
    setCurrentGuess("");  

    if (sanitizedGuess === wordToGuess) {
      alert("You win!");
      setGameOver(true);
    } else if (newGuesses.length === maxAttempts) {
      alert(`Game Over! The word was ${wordToGuess}.`);
      setGameOver(true);
    }
  };

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === "Enter") {
      handleGuess();
    } else if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));  
    } else if (key.match(/^[A-Za-z]$/) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key.toUpperCase()); 
    }
  };

  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentGuess, gameOver]);

  useEffect(() => {
    getRandomWord();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Wordle Clone</h1>
      <div>
        {Array.from({ length: maxAttempts }).map((_, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "center", margin: "5px" }}>
            {Array.from({ length: 5 }).map((_, charIndex) => (
              <div
                key={charIndex}
                style={{
                  width: "40px",
                  height: "40px",
                  margin: "2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid black",
                  backgroundColor:
                    index < guesses.length
                      ? feedback[index][charIndex] === "correct"
                        ? "green"
                        : feedback[index][charIndex] === "present"
                        ? "yellow"
                        : "gray"
                      : "white",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {index < guesses.length ? guesses[index][charIndex] : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>Current Guess: {currentGuess}</p>
      {gameOver && (
        <div>
          <p>{guesses.includes(wordToGuess) ? "Congratulations, you guessed the word!" : `The word was ${wordToGuess}.`}</p>
          <button onClick={startNewGame} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
