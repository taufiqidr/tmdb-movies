import Head from "next/head";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TMDB Movies</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
