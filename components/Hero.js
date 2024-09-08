import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-40">
      <main>
        <section id="hero" className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Decent Cloud
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Decentralized Cloud Platform that You and Your Business Can Trust
            </h2>
            <p className="text-xl mb-8">
              Use tech you know and trust <br />
              On servers with SLA, that you can trust <br />
              From companies with reputation, that you can trust <br />
              And all of that... <br />
              <br />
              without a vendor lock-in <br />
              and with fair and highly competitive pricing
            </p>
            <Link
              href="https://github.com/orgs/decent-cloud/discussions"
              target="_blank"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get involved now!
            </Link>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Hero;
