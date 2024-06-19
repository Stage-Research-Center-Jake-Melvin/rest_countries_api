import React, { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "@/components/Navbar";
import { ThemeContext } from "@/context/context";
import "@/styles/globals.css";
import "../styles/navbar.css";
import "../styles/main_section.css";
import "../styles/country_card.css";
import "../styles/detail_page.css";
import "../styles/border_country_box.css";
import { themeClassModifier } from "@/utils";

export type Theme = "Dark Mode" | "Light Mode";

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Dark Mode");
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={currentTheme}>
        <main className={`app__main ${themeClassModifier(currentTheme)}`}>
          <NavBar toggleFunction={setCurrentTheme} />
          <Component {...pageProps} />
        </main>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
