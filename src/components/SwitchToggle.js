import React from "react";
import "./SwitchToggle.css";

function SwitchToggle({ isOn, handleToggle, setValue, value }) {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  // if (theme === lightTheme || theme === darkTheme) {
  //   body.classList.add(theme);
  // } else {
  //   body.classList.add(lightTheme);
  // }

  setTimeout(() => {
    if (theme === "dark") {
      setValue(true);
    }
  }, 0);

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <>
      <input
        onClick={(e) => switchTheme(e)}
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "black" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

export default SwitchToggle;
