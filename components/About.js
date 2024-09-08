import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8">About Decent Cloud</h2>
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4 mb-8">
            <h3 class="text-xl font-semibold mb-4">Our Vision</h3>
            <p class="text-gray-600">
              Decent Cloud aims to revolutionize cloud computing by creating a
              decentralized platform that's accessible, secure, and efficient
              for everyone.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-4 mb-8">
            <h3 class="text-xl font-semibold mb-4">Why Decentralized?</h3>
            <p class="text-gray-600">
              Decentralization ensures better resource utilization, increased
              security, and fairer pricing, making cloud computing more
              democratic and sustainable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
