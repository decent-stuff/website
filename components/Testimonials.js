const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p>
              "Decent Cloud has revolutionized the way we handle cloud
              infrastructure!"
            </p>
            <p>- Tech Startup CEO</p>
          </div>
          <div>
            <p>
              "The secure Confidential Computing VMs are a game changer for data
              privacy."
            </p>
            <p>- ML Engineer</p>
          </div>
          <div>
            <p>
              "Finally, a decentralized cloud with transparent pricing and real
              flexibility."
            </p>
            <p>- Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
