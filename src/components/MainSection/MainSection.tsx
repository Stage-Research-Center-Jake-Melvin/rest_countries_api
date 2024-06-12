import { ThemeContext } from "@/context/context";
import { Theme } from "../../pages";
import React, { Dispatch, SetStateAction, useContext } from "react";
interface SectionElements {
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}
function MainSection({ showFilter, setShowFilter }: SectionElements) {
  function displayFilter(): void {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }
  let currentTheme = useContext(ThemeContext);
  return (
    <div
      className={`app__section ${
        currentTheme == "Dark Mode" ? "section_dark" : "section_light"
      }`}
    >
      <div
        className={`app__section-full-search ${
          currentTheme == "Dark Mode" ? "dark" : "light"
        }`}
      >
        <div
          className={`app__section-search ${
            currentTheme == "Dark Mode" ? "container_dark" : "container_light"
          }`}
        >
          <label htmlFor="search_tab">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <input
            id="search_tab"
            type="text"
            placeholder="Search for a country..."
          />
        </div>
        <div className={`app__section-filter`}>
          <div
            onClick={displayFilter}
            className={`app__section-filter-main ${
              currentTheme == "Dark Mode" ? "container_dark" : "container_light"
            }`}
          >
            <p>Filter by Region</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div
            style={{ display: `${showFilter ? "flex" : "none"}` }}
            className={`app__section-filter-content ${
              currentTheme == "Dark Mode" ? "container_dark" : "container_light"
            }`}
          >
            <p>Africa</p>
            <p>America</p>
            <p>Asia</p>
            <p>Europe</p>
            <p>Oceania</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainSection;
