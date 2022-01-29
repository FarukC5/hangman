import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";

const Popup = ({
  correctLetters,
  wrongLetters,
  setPlayable,
  playAgain,
  words,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, words) === "win") {
    if (wrongLetters.length > 0 || correctLetters.length > 0) {
      finalMessage = "Congratulations! You won!";
    }
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, words) === "lose") {
    finalMessage = "Unfortunately you lost.";
    finalMessageRevealWord = `...the word was: ${words}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
