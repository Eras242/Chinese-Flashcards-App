import React from "react";
import Settings from "./Settings";
import HanziDisplay from "./HanziDisplay";
import Interface from "./Interface";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import StatsPopup from "./StatsPopup";
import { AppContext } from "../context/AppContext";

export default function Main() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const style = {
    background: darkMode ? "#191c1f" : "#ececec",
  };

  return (
    <div className="main" style={style}>
      <Settings />
      <HanziDisplay />
      <Interface />
      <StatsPopup />
    </div>
  );
}
