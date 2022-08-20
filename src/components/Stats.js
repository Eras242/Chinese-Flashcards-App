import { MdOutlineClose } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTransition, animated } from "react-spring";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../stylesheets/Stats.css";

export default function Stats() {
  const { isVisible, handleModal } = useContext(AppContext);

  const overlayTransition = useTransition(isVisible, {
    from: { opacity: 0, x: 0, margin: 0 },
    enter: { opacity: 1, x: 0, margin: 0 },
    leave: { opacity: 0, x: 0, margin: 0 },
  });

  const containerTransition = useTransition(isVisible, {
    config: { mass: 2, tension: 150, friction: 22 },
    from: { y: 400, opacity: 0, delay: 50, margin: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 400, opacity: 0, delay: 50 },
  });

  return overlayTransition((style, item) =>
    item ? (
      <animated.div style={style} className="stats--overlay">
        {containerTransition((style, item) =>
          item ? (
            <animated.div style={style} className="stats--container">
              <h2>Most recent Session:</h2>
              <div className="recent--session"></div>
              <button className="btn close" onClick={handleModal}>
                <MdOutlineClose />
              </button>
              <p className="stats--date">Saturday 25th June 2022, 18:12pm </p>
              <div className="stats--recent--boxes">
                <div className="stats--box">
                  <p className="box detail">Difficulty</p>
                  <p className="box info">-</p>
                </div>
                <div className="stats--box">
                  <p className="box detail">Duration</p>
                  <p className="box info">-</p>
                </div>
                <div className="stats--box">
                  <p className="box detail">Words:</p>
                  <p className="box info">-</p>
                </div>
                <div className="stats--box">
                  <p className="box detail">Avg. Time</p>
                  <p className="box info">-</p>
                </div>
              </div>
              <div className="stats--difficulty--chart">Bar Chart</div>
              <div className="stats--difficulty--chart">Historical Data</div>
            </animated.div>
          ) : (
            ""
          )
        )}
      </animated.div>
    ) : (
      ""
    )
  );
}
