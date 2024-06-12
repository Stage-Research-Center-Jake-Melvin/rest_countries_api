import "@/styles/globals.css";
import "../styles/navbar.css";
import "../styles/main_section.css";
import React from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
