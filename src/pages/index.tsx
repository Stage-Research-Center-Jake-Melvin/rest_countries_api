import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { MainSection, NavBar } from "@/components";
import { ThemeContext } from "@/context/context";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { fetchAllCountries } from "@/server/actions";

/*Types*/
export type Theme = "Dark Mode" | "Light Mode";
export type Continent = "africa" | "america" | "asia" | "europe" | "oceania";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Dark Mode");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedContinent, setSelectedContinent] = useState<Continent>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryClient] = useState(() => new QueryClient());
  // useEffect(() => {
  //   const fetchFunction = async () => {
  //     setIsLoading(true);
  //     const res = await queryClient.prefetchQuery({
  //       queryKey: ["countries"],
  //       queryFn: fetchAllCountries,
  //     });
  //     console.log("Test QUERY");
  //     console.log(res);
  //     setIsLoading(false);
  //   };
  //   fetchFunction();
  // }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}
