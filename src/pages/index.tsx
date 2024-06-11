import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../components/navabar";
import { useState } from "react";
import Link from "next/link";
import MainSection from "../components/main_section";
export type ColorMode = "Dark Mode" | "Light Mode";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modeActuel, setModeActuel] = useState<ColorMode>("Dark Mode");
  return (
    <main className="app__main">
      <Navbar modeActuel={modeActuel} toggleFunction={setModeActuel} />
      <MainSection modeActuel={modeActuel} />
    </main>
  );
}
