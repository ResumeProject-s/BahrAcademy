import mainContext, { MainContextProvider } from "@/context/mainContext";
import "@/styles/globals.css";
import Head from "next/head";
import { useContext } from "react";

export default function App({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <Head>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}
