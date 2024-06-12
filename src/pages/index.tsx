import React, { useState } from "react";
import { Inter } from "next/font/google";
import { MainSection, NavBar } from "@/components";
import { ThemeContext } from "@/context/context";

/*Types*/
export type Theme = "Dark Mode" | "Light Mode";
export type Continent = "africa" | "america" | "asia" | "europe" | "oceania";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Dark Mode");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedContinent, setSelectedContinent] = useState<Continent>();
  return (
    <ThemeContext.Provider value={currentTheme}>
      <main className="app__main">
        <NavBar toggleFunction={setCurrentTheme} />
        <MainSection
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          selectedContinent={selectedContinent}
          changeContinent={setSelectedContinent}
        />
      </main>
    </ThemeContext.Provider>
  );
}
