const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Resources and reputation on blockchain
            </h3>
            <p>
              Wide range of node providers to choose from. Pick them based on
              your needs and expectations. All data is public and transparent
              (not anonymous). And you have a convenient tooling to do this
              step.{" "}
            </p>
            <p>
              From then on, you are free to continue using your legacy tech,
              that you love. Or continue with web3. Up to you.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confidential Computing</h3>
            <p>
              Keep your sensitive data confidential with ease using secure
              Confidential Computing VMs.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Reputation-Based Trust</h3>
            <p>
              Reputation and trust are hard to get and easy to lose. Just as in
              real life.
            </p>
            <p>
              The Decent Cloud blockchain-based reputation system allows you to
              easily check the reputation of others, and incentivizes honest
              behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
