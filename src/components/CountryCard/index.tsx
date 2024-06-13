import React, { useContext } from "react";
import { ThemeContext } from "@/context/context";

interface CountryCardProps {
  countryCode: string;
  countryName: string;
  countryPopulation: number;
  countryRegion: string;
  countryCapital: string[];
  countryFlag: string;
}

function CountryCard({
  countryCode,
  countryName,
  countryPopulation,
  countryRegion,
  countryCapital,
  countryFlag,
}: CountryCardProps) {

  let currentTheme = useContext(ThemeContext);
  
  const formatCapitalsDisplay = (capitals: string[]): string => {
    if (!capitals || capitals.length === 0) return "";

    return capitals.join(", ");
  };

  return (
    <div className="app__country-card">
      <div className="app__country-card_flag">
        <img src={countryFlag} alt={countryName} />
      </div>
      <div
        className={`app__country-card_info-section ${
          currentTheme == "Dark Mode"
            ? "container_dark"
            : "container_light light"
        }`}
      >
        <h2 className="app__country-card-title">{countryName}</h2>
        <p>
          <span>Population:</span> {countryPopulation}
        </p>
        <p>
          <span>Region:</span> {countryRegion}
        </p>
        <p>
          <span>Capital: </span>
          {formatCapitalsDisplay(countryCapital)}
        </p>
      </div>
    </div>
  );
}
export default CountryCard;
