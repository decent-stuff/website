import Head from "next/head";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Head>
        <title>
          Decent Cloud - Decentralized Cloud Platform that You and Your Business
          Can Trust
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com" defer />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Hero />
      <About />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
