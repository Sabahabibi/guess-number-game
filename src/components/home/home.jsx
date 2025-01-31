import { useState } from "react";
import { toast } from "react-toastify";

let RANDOM_RESULT = Math.floor(Math.random() * 100 - 1);

export default function Home() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [guessArray, setGuessArray] = useState([]);
  const [isWin, setIsWin] = useState(false);

  console.log(RANDOM_RESULT);

  function handleChange(e) {
    setGuess(e.target.value);
  }
  console.log(guess);

  function validation() {
    if (+guess === RANDOM_RESULT) {
      setMessage("You Win");
      setIsWin(true);
    } else if (Math.abs(RANDOM_RESULT - guess) <= 5) {
      if (RANDOM_RESULT > guess) {
        setMessage("You Need to guess a Higher Number and youre very close");
      } else {
        setMessage("You Need to guess a Lower Number and youre very close");
      }
    } else if (Math.abs(RANDOM_RESULT - guess) >= 5) {
      if (RANDOM_RESULT > guess) {
        setMessage("You Need to guess a Higher Number");
      } else {
        setMessage("You Need to guess a Lower Number");
      }
    }
  }
  console.log(message);

  function checkUserGuess() {
    // setGuessArray((prev) => [...prev, guess]);
    // [] , [15] , [15, 25] , [15,25,35]

    !!guess && validation();
    if (guessArray.length < 10) {
      if (!!guess && 100 > +guess && +guess > 0) {
        setGuessArray([...guessArray, guess]);
      } else {
        toast.error("Youre number must be between 0 - 100");
      }
    } else {
      toast.error("Your luck is over.");
    }
  }

  console.log(guessArray);
  return (
    <div>
      <div className="bg-blue-200 text-center p-7 shadow-xl font-mono">
        <h1 className="font-bold text-2xl text-blue-950">Guess Number Game</h1>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center pt-10 text-blue-950 text-xl md:mx-40 mx-20">
        <div className="flex flex-col gap-5 justify-center items-center">
          <p>Guess Number Between 0 - 100</p>
          {message && (
            <p className={`${isWin ? "text-green-800" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <input
            onChange={handleChange}
            disabled={isWin}
            value={guess}
            className="bg-blue-400 p-4 rounded-xl text-white placeholder:text-white shadow-md text-center border-none outline-none"
            type="number"
            placeholder="Enter Your Guess"
          />
          <button
            onClick={checkUserGuess}
            disabled={guessArray.length >= 10 || isWin}
            className="bg-blue-200 rounded-2xl p-4 shadow-lg text-blue-950 text-lg disabled:bg-blue-100"
          >
            Send Result
          </button>
        </div>
        <div>
          <h4>RESULT</h4>
        </div>
        <div className="grid grid-cols-5 gap-5 mx-5 w-full">
          {" "}
          {guessArray.map((guess) => {
            console.log(guess, RANDOM_RESULT);
            return (
              <div
                className={`p-5 border rounded-xl flex justify-center shadow-sm `}
              >
                {guess}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
