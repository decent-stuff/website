import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-40">
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
              href="https://github.com/orgs/decent-cloud/discussions"
              className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get involved
            </Link>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Hero;
