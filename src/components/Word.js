import React from "react";

const Word = ({ words, correctLetters }) => {
  return (
    <div className="word">
      {words.split("").map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
