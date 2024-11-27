import React, { useState } from "react";

function App() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [computerChoice, setComputerChoice] = useState("");
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  function getComputerChoice() {
    let computer = Math.random();
    if (computer < 0.33) {
      return "Rock";
    } else if (computer < 0.66) {
      return "Paper";
    } else {
      return "Scissors";
    }
  }

  const handleChoice = (userChoice) => {
    if (gameOver) return;

    const compChoice = getComputerChoice();
    setComputerChoice(compChoice);

    if (userChoice === compChoice) {
      setWinner("It's a draw!");
    } else if (
      (userChoice === "Rock" && compChoice === "Scissors") ||
      (userChoice === "Paper" && compChoice === "Rock") ||
      (userChoice === "Scissors" && compChoice === "Paper")
    ) {
      setWinner("You win!");
      setPlayerWins((prevWins) => prevWins + 1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setWinner("Computer wins!");
      setComputerWins((prevWins) => prevWins + 1);
      setScore((prevScore) => (prevScore > 0 ? prevScore - 1 : 0));
    }

    setRound((prevRound) => prevRound + 1);

    if (round + 1 === 5) {
      setGameOver(true);
      setWinner(
        playerWins > computerWins
          ? "You are the overall winner!"
          : playerWins < computerWins
            ? "Computer is the overall winner!"
            : "It's a tie overall!"
      );
    }
  };

  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-between items-center p-6 overflow-hidden">
        <h1 className="text-white text-5xl font-bold mt-6 mb-4 text-center">
          Welcome to Rock Paper Scissors
        </h1>
        <div className="flex gap-12 mb-12 justify-center">
          <div className="text-white text-2xl font-semibold flex flex-col items-center w-1/3">
            <div className="text-center text-xl">Round</div>
            <div className="bg-gray-700 text-4xl font-bold rounded-full p-6 w-28 h-28 flex items-center justify-center mx-auto">
              {round}
            </div>
          </div>

          <div className="text-white text-2xl font-semibold flex flex-col items-center w-1/3">
            <div className="text-center text-xl">Human</div>
            <div className="bg-gray-700 text-4xl font-bold rounded-full p-6 w-28 h-28 flex items-center justify-center mx-auto">
              {playerWins}
            </div>
          </div>

          <div className="text-white text-2xl font-semibold flex flex-col items-center w-1/3">
            <div className="text-center text-xl">Computer</div>
            <div className="bg-gray-700 text-4xl font-bold rounded-full p-6 w-28 h-28 flex items-center justify-center mx-auto">
              {computerWins}
            </div>
          </div>
        </div>


        <div className="text-white text-2xl font-semibold mb-4 text-center">
          {winner}
        </div>

        <div className="text-white text-lg mb-6 text-center">
          Computer's Chose: <span className="font-bold">{computerChoice}</span>
        </div>

        {!gameOver && (
          <div className="flex justify-center items-center gap-8 mb-8">
            <button
              className="w-[220px] h-[220px] bg-blue-500 text-white font-semibold text-3xl rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleChoice("Rock")}
            >
              Rock
            </button>
            <button
              className="w-[220px] h-[220px] bg-green-500 text-white font-semibold text-3xl rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleChoice("Paper")}
            >
              Paper
            </button>
            <button
              className="w-[220px] h-[220px] bg-red-500 text-white font-semibold text-3xl rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleChoice("Scissors")}
            >
              Scissors
            </button>
          </div>
        )}

        {gameOver && (
          <div className="flex justify-center items-center mb-8">
            <button
              className="bg-yellow-500 text-white font-semibold text-3xl py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleReplay}
            >
              REPLAY
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
