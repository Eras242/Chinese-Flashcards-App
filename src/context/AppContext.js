import React from "react";
import { createContext, useState, useEffect } from "react";
import ChineseApp from "../chineseApp";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [App, setApp] = useState(new ChineseApp());
  const [currentWord, setCurrentWord] = useState(App.getRandomWord());
  const [displayMeaning, setDisplayMeaning] = useState(false);

  const [displayNext, setDisplayNext] = useState(false);
  const [selectingDifficulty, setSelectingDifficulty] = useState(false);
  const [outOf, setOutOf] = useState(App.index);
  const [timer, setTimer] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const [startSessionText, setStartSessionText] = useState("Start Session");
  const [pressed, setPressed] = useState(false);

  // SESSION
  const [mode, setMode] = useState("Endless");
  const [wordsSelected, setWordsSelected] = useState(25);
  const [currentSessionListLength, setCurrentSessionListLength] = useState(
    App.words.length
  );

  const [difficulty, setDifficulty] = useState();
  const [sessionActive, setSessionActive] = useState(App.getSessionActive());
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // STOPWATCH
  const [abruptEnd, setAbruptEnd] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // STATS
  const [latestStat, setLatestStat] = useState(App.stats[App.stats.length - 1]);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(
    Object.values(App.difficulties).map((i) => i.length)
  );
  const [startData, setStartData] = useState(
    Object.values(App.difficulties).map((i) => i.length)
  );
  const [displayTemp, setDisplayTemp] = useState(true);

  const handlePressed = (e) => {
    if (e.key === " ") {
      console.log(e);
      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 75);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePressed);
  });

  const handleModal = () => {
    setIsVisible((p) => !p);
  };

  const handleReveal = () => {
    console.log(mode);
    if (mode === "Endless") {
      if (displayNext) {
        if (mode === "session") {
          setCurrentWord(App.currentWord);
          setDisplayMeaning((prev) => !prev);
        } else {
          setCurrentWord(
            App.words[(Math.random() * App.words.length).toFixed(0)]
          );
          setDisplayMeaning((prev) => !prev);
        }
      } else {
        setDisplayMeaning(true);
      }
      setDisplayNext((prev) => !prev);
    } else if (mode === "Session") {
      setDisplayMeaning((prev) => !prev);
      setSelectingDifficulty((prev) => !prev);
      console.log(selectingDifficulty + " SELECTING DIFFICULTY");
    }
  };

  const handleSelectWordDifficulty = (e) => {
    App.listManage(e.target.name);
    App.nextWord();
    setOutOf(App.index);
    setCurrentWord(App.currentWord);
    setSelectingDifficulty(false);
    setDisplayMeaning(false);
  };

  const handleInput = (e) => {
    if (Number.isInteger(e.target.value)) {
      console.log(e.target.value);
    }
  };

  const handleStartSession = (e) => {
    setStartData(Object.values(App.difficulties).map((i) => i.length));
    setDisplayTemp(false);
    setStartSessionText("3");
    setTimeout(() => {
      setStartSessionText("2");
      setTimeout(() => {
        setStartSessionText("1");
        setTimeout(() => {
          setStartSessionText("Stop Session");
          setCurrentWord(
            App.words[(Math.random() * App.words.length).toFixed(0)]
          );
          setMode("Session");
          setSessionActive(App.getSessionActive());
          App.startSession("hard", wordsSelected);
          setCurrentSessionListLength(App.sessionList.length);
          setRunning(true);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleEndSessionAbrupt = () => {
    App.endSessionAbrupt();
    setRunning(false);
    setTime(0);
    setCurrentSessionListLength(App.words.length);
    setMode("Endless");
    setStartSessionText("Start Session");
    setCurrentWord(App.words[(Math.random() * App.words.length).toFixed(0)]);
    setTimer(0);
    setAbruptEnd(true);
    console.log(abruptEnd);
    setTimeout(() => {
      setAbruptEnd(false);
      console.log(abruptEnd);
    }, 3000);
  };

  const handleEndSession = () => {
    App.endSession();
    setLatestStat(App.stats[App.stats.length - 1]);
    setRunning(false);
    setTime(0);
    setSessionActive(App.getSessionActive());
    setCurrentSessionListLength(App.words.length);
    setMode("Endless");
    setStartSessionText("Start Session");
    setCurrentWord(App.words[(Math.random() * App.words.length).toFixed(0)]);
    setData(Object.values(App.difficulties).map((i) => i.length));
    setTimer(0);
    setDisplayTemp(true);
    setTimeout(() => {
      setDisplayTemp(false);
    }, 9000000);
  };

  const displayTimer = () => {
    const startTime = new Date();
    return startTime;
  };

  const handleWordsNum = (e) => {
    setWordsSelected(e.target.textContent);
    setDropdownVisible(false);
  };

  useEffect(() => {
    if (App.getSessionActive() === false) {
      handleEndSession();
    }
  }, [outOf]);

  return (
    <AppContext.Provider
      value={{
        latestStat,
        currentWord,
        setCurrentWord,
        mode,
        setMode,
        data,
        setAbruptEnd,
        abruptEnd,
        displayMeaning,
        setDisplayMeaning,
        handleStartSession,
        handleEndSessionAbrupt,
        selectingDifficulty,
        startSessionText,
        handleInput,
        inputValue,
        setInputValue,
        setStartSessionText,
        wordsSelected,
        setWordsSelected,
        currentSessionListLength,
        handleWordsNum,
        handleModal,
        pressed,
        setPressed,
        handleSelectWordDifficulty,
        handleReveal,
        displayNext,
        outOf,
        isVisible,
        dropdownVisible,
        setDropdownVisible,
        time,
        setTime,
        running,
        setRunning,
        displayTemp,
        setDisplayTemp,
        startData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
