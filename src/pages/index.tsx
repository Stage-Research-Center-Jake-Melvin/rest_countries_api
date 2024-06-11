import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./navabar";
import { useState } from "react";
export type ColorMode = "Dark Mode" | "Light Mode";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modeActuel, setModeActuel] = useState<ColorMode>("Dark Mode");
  return (
    <main className="app__main">
      <Navbar
        modeActuel={modeActuel}
        toggleFunction={setModeActuel}
      />
    </main>
  );
}
