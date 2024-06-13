import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "@/server/actions";
import { ThemeContext } from "@/context/context";
import { Continent, Theme } from "../../pages";
import { CircularProgress } from "@mui/joy";
import CountryCard from "../CountryCard";

interface SectionElements {
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  selectedContinent: Continent | undefined;
  changeContinent: Dispatch<SetStateAction<Continent | undefined>>;
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
}: SectionElements) {
  function displayFilter(): void {
    if (showFilter) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }
  let currentTheme = useContext(ThemeContext);
  function chooseContinent(continent: Continent): void {
    changeContinent(continent);
    setShowFilter(false);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  });
  console.log("Here is the data");
  console.log(data);
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
            <p onClick={() => chooseContinent("africa")}>Africa</p>
            <p onClick={() => chooseContinent("america")}>America</p>
            <p onClick={() => chooseContinent("asia")}>Asia</p>
            <p onClick={() => chooseContinent("europe")}>Europe</p>
            <p onClick={() => chooseContinent("oceania")}>Oceania</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="app__section-loading-countries">
          <CircularProgress size="lg" variant="plain" />
        </div>
      ) : data ? (
        <div className="app__section-grid-countries">
          {data.map((country: Country) => {
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
        <div>
          <p>An Error occured and the data has not been fetched correctly</p>
        </div>
      )}
    </div>
  );
}
export default MainSection;
