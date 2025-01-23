'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";
import DashboardSection from "@/components/dashboard-section";
import FeaturesSection from "@/components/features-section";

interface InfoSectionProps {
  title: string;
  content: string;
  icon?: string;
}

function InfoSection({ title, content, icon }: InfoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white bg-opacity-10 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h4 className="text-xl font-bold flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h4>
        <button className="text-white/80 hover:text-white">
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-white/90" dangerouslySetInnerHTML={{ __html: content }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const infoSections = [
  {
    title: "What is Decent Cloud?",
    icon: "🤔",
    content: `Think of us as the &quot;Airbnb of cloud services&quot; - just more fair and open! We&apos;re a community-driven platform
    that&apos;s shaking up the cloud oligopoly by enabling peer-to-peer resource sharing. Say goodbye to steep pricing and
    those pesky region-wide outages!<br/><br/>
    <strong>Key highlights:</strong><br/>
    • Provider reputations and reviews tracked in tamper-proof ledger<br/>
    • No gatekeepers or central control<br/>
    • Self-sustaining with minimal fees<br/>
    • Community-driven evolution`
  },
  {
    title: "How does mining or validation work?",
    icon: "⛏️",
    content: `Anyone can be a validator! Just follow these steps:<br/>
    1. Get some DCT tokens (from ICP Swap or other users)<br/>
    2. Run <code>dc np check-in</code> with your identity<br/>
    3. Get rewarded with block rewards<br/><br/>
    <strong>Quick facts:</strong><br/>
    • 50 DCT initial block reward<br/>
    • Unclaimed rewards are carried over to the next block<br/>
    • New block every 10 minutes<br/>
    • Reward halves every 210,000 blocks<br/>
    • Total supply: ~21M DCT`
  },
  {
    title: "Show me the money! (Tokenomics)",
    icon: "💰",
    content: `Our Decentralized Cloud Token (DCT) powers the whole ecosystem:<br/><br/>
    • <strong>Demand:</strong> Users need to acquire DC tokens to pay for renting services or resources<br/>
    • <strong>Supply:</strong> DC tokens can be acquired by renting services or resources, or by mining/validating<br/>
    • <strong>Governance:</strong> Platform is DAO-controlled for community-driven decisions<br/>`
  }
];

interface DashboardData {
  dctPrice: number;
  providerCount: number;
  totalBlocks: number;
  blocksUntilHalving: number;
  validatorCount: number;
  blockReward: number;
}

interface PageProps {
  dashboardData: DashboardData | null;
}

export function Page({ dashboardData }: PageProps) {

  return (
      <>
        <div className="min-h-screen bg-animated text-white  px-6 sm:px-8 md:px-12 lg:px-22 xl:px-30">
          <Navbar/>
          <HeroSection/>

          <main className="container mx-auto py-10">

            {dashboardData && (
                  <DashboardSection dashboardData={dashboardData}/>
            )}

            <FeaturesSection/>

            <section id="info" className="py-20">
              <h3 className="text-3xl font-bold text-center mb-12">Want to know more?</h3>
              <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                {infoSections.map((section, index) => (
                    <InfoSection key={index} {...section} />
                ))}
              </div>
            </section>

            <section id="benefits" className="py-20">
              <h3 className="text-3xl font-bold text-center mb-12">Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    className="bg-white bg-opacity-10 p-6 rounded-lg"
                    animate={{opacity: 1, x: 0}}
                    initial={{opacity: 0, x: -20}}
                    transition={{duration: 0.5}}
                >
                  <h4 className="text-2xl font-bold mb-4">For Developers</h4>
                  <ul className="list-disc list-inside">
                    <li>Convenience: Find suitable cloud providers faster than you can say &quot;404 not
                      found&quot;</li>
                    <li>Trust: Obtain legal guarantees and SLAs worth the digital paper they&apos;re written on</li>
                    <li>No vendor lock-in: Easy multi-cloud deployments with consistent APIs</li>
                  </ul>
                </motion.div>
                <motion.div
                    className="bg-white bg-opacity-10 p-6 rounded-lg"
                    animate={{opacity: 1, x: 0}}
                    initial={{opacity: 0, x: 20}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                  <h4 className="text-2xl font-bold mb-4">For Node Providers</h4>
                  <ul className="list-disc list-inside">
                    <li>Market: Access to a trillion-dollar crypto market</li>
                    <li>Users: Reach a global user base</li>
                    <li>Fair pricing: Transparent pricing without a race-to-the-bottom approach</li>
                  </ul>
                </motion.div>
              </div>
            </section>
          </main>
        </div>
        <Footer/>
      </>
  )
}
