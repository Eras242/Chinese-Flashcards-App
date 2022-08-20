import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";
import "../stylesheets/hanziDisplay.css";

export default function HanziDisplay() {
  const { darkMode } = useContext(ThemeContext);
  const style = {
    outline: darkMode
      ? "1px solid rgba(255, 255, 255, 0.05)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    background: darkMode ? "rgba(48, 50, 52, 0.5)" : "rgb(155, 155, 155, 1)",
    color: darkMode ? "White" : "Black",
  };

  const { currentWord, setCurrentWord, displayMeaning } =
    useContext(AppContext);

  return (
    <div className="zh_displayBox" style={style}>
      <a
        className="hanzi"
        href={`https://en.wiktionary.org/wiki/${currentWord.hanzi}`}
        target="_blank"
      >
        <h1>{currentWord.hanzi}</h1>
      </a>
      <p className="pinyin">{currentWord.pinyin}</p>
      <p
        className="meaning"
        style={
          displayMeaning ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        {currentWord.meaning}
      </p>
    </div>
  );
}
