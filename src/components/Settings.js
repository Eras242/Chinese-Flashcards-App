import React from "react";
import NumDropdown from "./NumDropdown";
import { RiBarChartLine } from "react-icons/ri";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";
import { useTransition, animated } from "react-spring";
import "../stylesheets/Settings.css";
import Stopwatch from "./Stopwatch";

export default function Settings() {
  const { darkMode } = useContext(ThemeContext);

  const style = {
    outline: darkMode
      ? "1px solid rgba(255, 255, 255, 0.05)"
      : "1px solid rgba(0, 0, 0, 0.1)",
  };

  const {
    mode,
    timer,
    handleStartSession,
    handleEndSessionAbrupt,
    startSessionText,
    wordsSelected,
    handleWordsNum,
    handleModal,
    currentSessionListLength,
    outOf,
    handleInput,
    abruptEnd,
    setAbruptEnd,
  } = useContext(AppContext);

  const abruptTransition = useTransition(abruptEnd, {
    // config: { mass: 1, tension: 250, friction: 15 },

    config: { mass: 3, tension: 800, friction: 60 },
    from: { y: 150, opacity: 0, margin: "0px" },
    enter: { y: -15, opacity: 1, margin: "0px" },
    leave: { y: -400, opacity: 0, margin: "0px" },
  });

  return (
    <>
      {abruptTransition((style, item) =>
        item ? (
          <animated.div className="notif abrupt" style={style}>
            <p>Session ended abruptly! Stats not logged...</p>
          </animated.div>
        ) : (
          ""
        )
      )}
      <div className="settings">
        <div className="settings mode">
          <button
            className={
              mode === "Session" ? "btn mode type session" : "btn mode type"
            }
          >
            {mode}
          </button>
          <button className="btn mode timer">
            <Stopwatch />
          </button>
          <button className="btn mode">
            {" "}
            {outOf} / {currentSessionListLength}
          </button>
        </div>
        <div className="settings details">
          <button
            className="btn start"
            onClick={
              mode === "Endless" ? handleStartSession : handleEndSessionAbrupt
            }
          >
            {mode === "Session" ? "Stop Session" : startSessionText}
          </button>
          <NumDropdown
            wordsSelected={wordsSelected}
            handleWordsNum={handleWordsNum}
            handleInput={handleInput}
          />
          <button className="btn start" style={style}>
            Difficulty
          </button>
          <button className="btn stats" onClick={handleModal} style={style}>
            <RiBarChartLine />
          </button>
        </div>
      </div>
    </>
  );
}
