import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Decent Cloud</h1>
          <p>
            Decent Cloud is a decentralized cloud platform designed to bridge
            the gap between traditional centralized cloud services and fully
            decentralized systems.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
