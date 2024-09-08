import Head from "next/head";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-40">
      <Head>
        <title>
          Decent Cloud - Decentralized Cloud Platform that You and Your Business
          Can Trust
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com" async />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <main>
        <section id="hero" className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Decentralized Cloud that you can trust
            </h1>
            <p className="text-xl mb-8">
              Tech you can trust <br />
              Servers with SLA <br />
              Companies with reputation you can trust <br />
              But... <br />
              <br />
              without a vendor lock-in
            </p>
            <Link
              href="#contact"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get Notified
            </Link>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Hero;
