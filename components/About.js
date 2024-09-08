const AboutPage = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What makes Decent Cloud different?
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              Decent Cloud aims to revolutionize cloud computing by creating a
              decentralized platform that is accessible, secure, and efficient
              for everyone.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Why Decentralized?</h3>
            <p className="text-gray-600">
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

export default AboutPage;
