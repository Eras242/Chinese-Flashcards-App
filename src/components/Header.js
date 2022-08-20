import React from "react";
import "../stylesheets/Header.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AiOutlineInfo } from "react-icons/ai";

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const style = {
    color: darkMode ? "rgba(255, 255, 255, 0.8)" : "#191c1f",
  };
  return (
    <div className="title--info" style={style}>
      <p
        className="title"
        style={{
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        Chinese Learning App
      </p>
      <p
        className="title info"
        style={{
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <AiOutlineInfo />
      </p>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => setDarkMode((prev) => !prev)}
        ></input>
        <span
          className="slider"
          style={{
            border: darkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        ></span>
      </label>
    </div>
  );
}
