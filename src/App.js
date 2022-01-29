import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers";
import "./App.css";

function App() {
  const [words, setWords] = useState("");
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=1", {})
      .then((words) => {
        const wordUpper = words.data;
        setWords(wordUpper[0]);
      })
      .catch((err) => console.log(err));
    //  playAgain();
  }, []);

  console.log(words);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    // setWords('');

    axios
      .get("https://random-word-api.herokuapp.com/word?number=1", {})
      .then((words) => {
        const wordUpper = words.data;
        setWords(wordUpper[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        let letter = key.toLowerCase();
        if (words.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [wrongLetters, correctLetters, playable, words]);

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word words={words} correctLetters={correctLetters} />
      </div>
      
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        words={words}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
    {showNotification && ( 
      <Notification showNotification={showNotification} />
    )}
    </>
  );
}

export default App;
