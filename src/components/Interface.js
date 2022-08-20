import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useSpring, useTransition, animated } from "react-spring";
import "../stylesheets/Interface.css";

export default function Interface() {
  const { darkMode } = useContext(ThemeContext);
  const {
    setMode,
    mode,
    handleSelectWordDifficulty,
    handleReveal,
    selectingDifficulty,
    displayNext,
    pressed,
  } = useContext(AppContext);

  const style = {
    outline: darkMode
      ? "1px solid rgba(255, 255, 255, 0.05)"
      : "1px solid rgba(0, 0, 0, 0.1)",
  };

  const props = useSpring(
    mode === "Endless"
      ? {
          margin: "0px",
          opacity: 0,
          visibility: "hidden",
          config: { mass: 1, tension: 250, friction: 15 },
        }
      : {
          margin: "0",
          margin: "30px",
          visibility: "visible",
          opacity: 1,

          config: { mass: 1, tension: 250, friction: 15 },
        }
  );

  const transition = useTransition(mode, {
    config: { mass: 1, tension: 250, friction: 1 },
    from: { y: 400 },
    enter: { y: 0 },
    leave: { y: 400 },
  });

  return (
    <div className="interface">
      <animated.div className="difficulty" style={props}>
        <div className="btn--container">
          <button
            className="btn difficulty"
            name="veryEasy"
            id="VeryEasy"
            button="1"
            onClick={handleSelectWordDifficulty}
            style={style}
          >
            Very Easy
          </button>
          <p className="key">1</p>
        </div>

        <div className="btn--container">
          <button
            className="btn difficulty"
            name="easy"
            id="Easy"
            button="2"
            onClick={handleSelectWordDifficulty}
            style={style}
          >
            Easy
          </button>
          <p className="key">2</p>
        </div>
        <div className="btn--container">
          <button
            className="btn difficulty"
            name="medium"
            id="Medium"
            button="3"
            onClick={handleSelectWordDifficulty}
            style={style}
          >
            Medium
          </button>
          <p className="key">3</p>
        </div>
        <div className="btn--container">
          <button
            className="btn difficulty"
            name="hard"
            id="Hard"
            button="4"
            onClick={handleSelectWordDifficulty}
            style={style}
          >
            Hard
          </button>
          <p className="key">4</p>
        </div>
      </animated.div>
      {mode === "Endless" ? (
        <button
          className="btn cycle"
          onClick={handleReveal}
          style={{ display: "inline" }}
        >
          {displayNext ? "Next" : "Reveal"}
        </button>
      ) : (
        <button
          className={selectingDifficulty ? "btn cycle select" : "btn cycle"}
          onClick={() => {
            handleReveal();
            console.log(selectingDifficulty);
          }}
          style={{ display: "inline" }}
        >
          {selectingDifficulty ? "Select a difficulty..." : "Reveal"}
        </button>
      )}
      {/* <button
        onClick={() => {
          if (mode === "Endless") {
            setMode("Session");
          } else {
            setMode("Endless");
          }
        }}
      >
        Show
      </button> */}
      <p className={pressed ? " key spacebar active" : "key spacebar"}>
        spacebar
      </p>
    </div>
  );
}
