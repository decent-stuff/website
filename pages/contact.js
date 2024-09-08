import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div>
      <Header />
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p>
            If you have any questions or want to get in touch, feel free to
            contact us through the form below.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
