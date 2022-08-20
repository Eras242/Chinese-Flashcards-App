import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Stopwatch() {
  const { time, setTime, running, setRunning } = useContext(AppContext);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <span>{String(Math.floor(time / 1000)).slice(-2)}.</span>
      <span>{("0" + ((time / 10))).slice(-2) + "s"}</span>
    </div>
  );
}
