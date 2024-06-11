import { ColorMode } from "../pages";
import React from "react";
interface SectionElements {
  modeActuel: ColorMode;
}

function MainSection({ modeActuel }: SectionElements) {
  return (
    <div
      className={`app__section ${
        modeActuel == "Dark Mode" ? "section_dark" : "section_light"
      }`}
    >
      <div
        className={`app__section-full-search ${
          modeActuel == "Dark Mode" ? "dark" : "light"
        }`}
      >
        <div
          className={`app__section-search ${
            modeActuel == "Dark Mode" ? "container_dark" : "container_light"
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
            className={`app__section-filter-main ${
              modeActuel == "Dark Mode" ? "container_dark" : "container_light"
            }`}
          >
            <p>Filter by Region</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div
            className={`app__section-filter-content ${
              modeActuel == "Dark Mode" ? "container_dark" : "container_light"
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
