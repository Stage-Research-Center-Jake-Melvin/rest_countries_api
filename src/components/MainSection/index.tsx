import React, { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "@/context/context";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@/server/actions";
import { CircularProgress } from "@mui/joy";
import { Region } from "../../pages";
import CountryCard from "../CountryCard";

interface SectionElements {
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  selectedContinent: Region | undefined;
  changeContinent: Dispatch<SetStateAction<Region | undefined>>;
  searchValue: string;
  changeSearchValue: Dispatch<SetStateAction<string>>;
  debouncedSearchTerm: string;
}

interface Country {
  flags: { png: string };
  name: { common: string };
  cca3: string;
  population: number;
  region: string;
  capital: string[];
}

function MainSection({
  showFilter,
  setShowFilter,
  selectedContinent,
  changeContinent,
  searchValue,
  changeSearchValue,
  debouncedSearchTerm,
}: SectionElements) {
  function displayFilter(): void {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }
  let currentTheme = useContext(ThemeContext);

  const { data, isLoading } = useQuery({
    queryKey: ["countries", debouncedSearchTerm],
    queryFn: () => fetchCountries(debouncedSearchTerm),
  });

  function chooseContinent(region: Region): void {
    changeContinent(region);
    setShowFilter(false);
  }
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
            type="search"
            value={searchValue}
            onChange={(e) => changeSearchValue(e.target.value)}
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
            <p>{`${
              selectedContinent != undefined
                ? selectedContinent
                : "Filter by Region"
            }`}</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div
            style={{ display: `${showFilter ? "flex" : "none"}` }}
            className={`app__section-filter-content ${
              currentTheme == "Dark Mode" ? "container_dark" : "container_light"
            }`}
          >
            <p onClick={() => chooseContinent("All")}>All</p>
            <p onClick={() => chooseContinent("Africa")}>Africa</p>
            <p onClick={() => chooseContinent("Americas")}>America</p>
            <p onClick={() => chooseContinent("Asia")}>Asia</p>
            <p onClick={() => chooseContinent("Europe")}>Europe</p>
            <p onClick={() => chooseContinent("Oceania")}>Oceania</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="app__section-loading-countries">
          <CircularProgress size="lg" variant="plain" />
        </div>
      ) : data && data.length > 0 ? (
        <div className="app__section-grid-countries">
          {data
            .filter((country: Country) => {
              if (selectedContinent && selectedContinent != "All") {
                if (country.region == selectedContinent) {
                  return country;
                }
              } else {
                return country;
              }
            })
            .map((country: Country) => {
              return (
                <CountryCard
                  countryFlag={country.flags["png"]}
                  countryName={country.name["common"]}
                  countryCode={country["cca3"]}
                  countryPopulation={country.population}
                  countryRegion={country.region}
                  countryCapital={country.capital}
                />
              );
            })}
        </div>
      ) : (
        <div className="app__section-error">
          <p>Something went wrong</p>
        </div>
      )}
    </div>
  );
}
export default MainSection;
