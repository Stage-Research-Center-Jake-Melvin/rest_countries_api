import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./navabar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="app__main">
      <Navbar />
    </main>
  );
}
