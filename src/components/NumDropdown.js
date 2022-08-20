import { useState, useContext } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import "../stylesheets/Dropdown.css";

export default function NumDropdown({
  wordsSelected,
  handleWordsNum,
  handleInput,
}) {
  const {
    inputValue,
    setInputValue,
    setWordsSelected,
    dropdownVisible,
    setDropdownVisible,
  } = useContext(AppContext);

  return (
    <div className="dropdown">
      <button
        className="btn num"
        onClick={() => {
          setDropdownVisible((p) => !p);
        }}
      >
        <MdKeyboardArrowRight />
        {wordsSelected} Words
      </button>
      <div
        id="word--num--dropdown"
        className="dropdown-content"
        style={dropdownVisible ? { display: "flex" } : { display: "none" }}
      >
        <div className="dropdown-item" onClick={handleWordsNum}>
          10
        </div>
        <div className="dropdown-item" onClick={handleWordsNum}>
          15
        </div>
        <div className="dropdown-item" onClick={handleWordsNum}>
          20
        </div>
        <div className="dropdown-item" onClick={handleWordsNum}>
          All
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            setWordsSelected(inputValue);
          }}
        >
          <input
            id="custom"
            type="text"
            value={inputValue}
            name="numbers"
            pattern="[0-9]*"
            placeholder="Custom..."
            onChange={(e) => {
              setInputValue((v) =>
                e.target.validity.valid ? e.target.value : v
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
