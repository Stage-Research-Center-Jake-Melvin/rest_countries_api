import React, { useState } from "react";
import { MainSection, NavBar } from "@/components";
import { ThemeContext } from "@/context/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*Types*/
export type Theme = "Dark Mode" | "Light Mode";
export type Region =
  | "All"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Dark Mode");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={currentTheme}>
          <main className="app__main">
            <NavBar toggleFunction={setCurrentTheme} />
            <MainSection
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              selectedContinent={selectedRegion}
              changeContinent={setSelectedRegion}
            />
          </main>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </div>
  );
}
