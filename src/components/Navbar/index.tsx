import { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "@/context/context";
import { Theme } from "../../pages";


interface NavbarProps {
  toggleFunction: Dispatch<SetStateAction<Theme>>;
}


function NavBar({ toggleFunction }: NavbarProps) {
  let currentTheme = useContext(ThemeContext);
  function changeMode(): void {
    if (currentTheme == "Dark Mode") {
      toggleFunction("Light Mode");
    } else {
      toggleFunction("Dark Mode");
    }
  }
  
  return (
    <div
      className={`app__navbar ${
        currentTheme == "Dark Mode" ? "container_dark" : "container_light"
      }`}
    >
      <p
        className={`app__navbar-title ${
          currentTheme == "Dark Mode" ? "dark" : "light"
        }`}
      >
        Where in the world?
      </p>
      <div
        className={`app__navbar-mode ${
          currentTheme == "Dark Mode" ? "dark" : "light"
        }`}
        onClick={changeMode}
      >
        {currentTheme == "Dark Mode" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}

        <p>{currentTheme}</p>
      </div>
    </div>
  );
}
export default NavBar;
