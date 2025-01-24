"use client";

import { motion } from "framer-motion";
import HeaderSection from "@/components/ui/header";

const BenefitsSection = () => {
    return (
        <section id="benefits" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <HeaderSection
                    title={"Benefits"}
                    subtitle={"Unlock the advantages for developers and providers in the decentralized cloud"}
                />
                <motion.div
                    className="max-w-4xl mx-auto grid grid-cols-1 gap-8"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.6}}
                >
                    <motion.div
                        className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-white/10
                           p-6 rounded-xl backdrop-blur-md shadow-lg hover:shadow-2xl transition-all
                           duration-300 ease-in-out cursor-pointer"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                    >
                        <h4 className="text-2xl font-bold mb-4 text-white text-center sm:text-left">
                            For Developers
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 text-left">
                            <li><strong>Convenience:</strong> Find suitable cloud providers faster than you can say `&quot; 404
                                not found`&quot;.
                            </li>
                            <li><strong>Trust:</strong> Obtain legal guarantees and SLAs worth the digital paper they`&apos;re
                                written on.
                            </li>
                            <li><strong>No vendor lock-in:</strong> Easy multi-cloud deployments with consistent APIs.
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-white/10
                           p-6 rounded-xl backdrop-blur-md shadow-lg hover:shadow-2xl transition-all
                           duration-300 ease-in-out cursor-pointer"
                        initial={{opacity: 0, x: 30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <h4 className="text-2xl font-bold mb-4 text-white text-center sm:text-left">
                            For Node Providers
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 text-left">
                            <li><strong>Market:</strong> Access to a trillion-dollar crypto market.</li>
                            <li><strong>Users:</strong> Reach a global user base.</li>
                            <li><strong>Fair pricing:</strong> Transparent pricing without a race-to-the-bottom
                                approach.
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitsSection;
