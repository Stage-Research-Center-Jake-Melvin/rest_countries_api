import { Dispatch, SetStateAction, useState } from "react";
import { ColorMode } from ".";

interface ChangeMode {
  modeActuel: ColorMode;
  toggleFunction: Dispatch<SetStateAction<ColorMode>>;
}

function changeMode(): void {}
function Navbar({ toggleFunction, modeActuel }: ChangeMode) {
  function changeMode(): void {
    if (modeActuel == "Dark Mode") {
      toggleFunction("Light Mode");
    } else {
      toggleFunction("Dark Mode");
    }
  }
  return (
    <div
      className={`app__navbar ${
        modeActuel == "Dark Mode" ? "container_dark" : "container_light"
      }`}
    >
      <p
        className={`app__navbar-title ${
          modeActuel == "Dark Mode" ? "dark" : "light"
        }`}
      >
        Where in the world?
      </p>
      <div
        className={`app__navbar-mode ${
          modeActuel == "Dark Mode" ? "dark" : "light"
        }`}
        onClick={changeMode}
      >
        {modeActuel == "Dark Mode" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}

        <p>{modeActuel}</p>
      </div>
    </div>
  );
}
export default Navbar;
