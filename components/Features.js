const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Decentralized Infrastructure
            </h3>
            <p>
              Our platform leverages a network of independent node providers to
              ensure resilience and flexibility.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confidential Computing</h3>
            <p>
              Handle sensitive data with ease using our secure Confidential
              Computing VMs.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Reputation-Based Trust</h3>
            <p>
              Build trust through a blockchain-based reputation system that
              rewards honest behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
