import React, { useContext } from "react";
import { ThemeContext } from "@/context/context";
import { themeClassModifier } from "@/utils";

interface CountryCardProps {
  countryName: string;
  countryPopulation: number;
  countryRegion: string;
  countryCapital: string[];
  countryFlag: string;
}
export const formatCapitalsDisplay = (capitals: string[]): string => {
  if (!capitals || capitals.length === 0) return "";

  return capitals.join(", ");
};

function CountryCard({
  countryName,
  countryPopulation,
  countryRegion,
  countryCapital,
  countryFlag,
}: CountryCardProps) {
  let currentTheme = useContext(ThemeContext);

  return (
    <div className="app__country-card">
      <div className="app__country-card_flag">
        <img src={countryFlag} alt={countryName} />
      </div>
      <div
        className={`app__country-card_info-section ${themeClassModifier(
          currentTheme
        )}`}
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
