import Head from "next/head";
import Hero from "../components/Hero";
import About from "../components/About";
import Whitepaper from "../components/Whitepaper";
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
      </Head>
      <Hero />
      <About />
      <Features />
      <Whitepaper />
      <Footer />
    </div>
  );
};

export default Home;
