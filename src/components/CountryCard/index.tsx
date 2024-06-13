import React, { useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "@/context/context";
import { Theme } from "@mui/joy";
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
          {countryCapital
            ? countryCapital.length > 1
              ? `${countryCapital.forEach((capital, index) => {
                  if (index != countryCapital.length - 1) return `${capital}, `;
                  return `${capital}`;
                })}`
              : `${countryCapital[0]}`
            : ""}
        </p>
      </div>
    </div>
  );
}
export default CountryCard;
