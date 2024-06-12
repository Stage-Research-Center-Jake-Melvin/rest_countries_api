import { MainSection, NavBar } from "@/components";
import { ThemeContext } from "@/context/context";
import { Inter } from "next/font/google";
import React, { useState } from "react";

/*Types*/
export type Theme = "Dark Mode" | "Light Mode";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Dark Mode");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <main className="app__main">
        <NavBar toggleFunction={setCurrentTheme} />
        <MainSection showFilter={showFilter} setShowFilter={setShowFilter} />
      </main>
    </ThemeContext.Provider>
  );
}
