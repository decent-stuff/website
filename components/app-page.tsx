'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {Typewriter} from "react-simple-typewriter";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";

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
    • <strong>Minting:</strong> New block every 10 mins, block rewards halving every 210k blocks<br/>
    • <strong>Distribution:</strong> Rewards for active participants<br/>
    • <strong>Entry:</strong> Small registration fee (0.5 DCT) for reward eligibility<br/>
    • <strong>Governance:</strong> DAO-controlled for community-driven decisions<br/>
    • <strong>Usage:</strong> Rent nodes with DCT, hold for growth, or cash out`
  }
];

const features = [
  {
    icon: "🌐",
    title: "Decentralized Physical Infrastructure (DePIN)",
    description: "Access tailored virtual or physical servers from reputable node providers. It's not just a cloud, it's a whole sky full of possibilities!"
  },
  {
    icon: "⭐",
    title: "Reputation-Based System",
    description: "Make informed decisions with our transparent provider reputation system. We put the 'trust' in trustless technology!"
  },
  {
    icon: "🔒",
    title: "Confidential Computing",
    description: "Process sensitive data securely in Confidential Computing VMs. Your secrets are safe with us (even we don't know them)!"
  },
  {
    icon: "🤝",
    title: "No Vendor Lock-in",
    description: "Easy multi-cloud deployments with consistent APIs and liberal Open Source license. Decent Cloud is going nowhere, you're safe with us. You're not just a customer, you're a free spirit!"
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
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
      <>
        <div className="min-h-screen bg-animated text-white  px-6 sm:px-8 md:px-12 lg:px-22 xl:px-30">
          <Navbar/>
          <HeroSection/>

          <main className="container mx-auto">

            {dashboardData && (
                <section className="py-10">
                  <motion.div
                      className="max-w-2xl mx-auto bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm"
                      animate={{opacity: 1, y: 0}}
                      initial={{opacity: 0, y: 20}}
                      transition={{duration: 0.5}}
                  >
                    <table className="w-full text-sm">
                      <tbody>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                      <td className="p-2 pl-4">
                          <span className="font-semibold">Latest DCT Price 💎</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              Our token is like a digital diamond - rare, valuable, and totally decent!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">${dashboardData.dctPrice.toFixed(4)}</td>
                      </tr>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                        <td className="p-2 pl-4">
                          <span className="font-semibold">Provider Squad 🤝</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              Our awesome providers making the cloud decent again!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">{dashboardData.providerCount} providers</td>
                      </tr>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                        <td className="p-2 pl-4">
                          <span className="font-semibold">Block Party 🎉</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              {dashboardData.totalBlocks.toLocaleString()} blocks validated and counting!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">{dashboardData.totalBlocks.toLocaleString()}</td>
                      </tr>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                        <td className="p-2 pl-4">
                          <span className="font-semibold">Blocks Until Next Halving ⏳</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              {dashboardData.blocksUntilHalving.toLocaleString()} blocks until rewards halve!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">{dashboardData.blocksUntilHalving.toLocaleString()}</td>
                      </tr>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                        <td className="p-2 pl-4">
                          <span className="font-semibold">Current Block Validators 🛡️</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              {dashboardData.validatorCount} validators keeping us decent!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">{dashboardData.validatorCount}</td>
                      </tr>
                      <tr className="group border-b border-white/10 hover:bg-white/5 cursor-help relative">
                        <td className="p-2 pl-4">
                          <span className="font-semibold">Current Block Rewards 🎁</span>
                          <span
                              className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mt-1 w-48 p-2 bg-gray-900 text-xs rounded-lg z-10">
                                              {dashboardData.blockReward} DCT per validated block! With carry-over if unclaimed!
                                          </span>
                        </td>
                        <td className="p-2 pr-4 text-right">{dashboardData.blockReward.toFixed(2)} DCT</td>
                      </tr>
                      </tbody>
                    </table>
                  </motion.div>
                </section>
            )}

            <section id="features" className="py-20">
              <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {features.map((feature, index) => (
                      <motion.div
                          key={index}
                          className={`bg-white bg-opacity-10 p-6 rounded-lg ${index === activeFeature ? 'ring-2 ring-purple-400' : ''}`}
                          animate={{opacity: 1, y: 0}}
                          initial={{opacity: 0, y: 20}}
                          transition={{duration: 0.5, delay: index * 0.1}}
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                        <p>{feature.description}</p>
                      </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

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
        <footer className="text-center py-6 bg-black bg-opacity-30">
          <p>&copy; 2025 Decent Cloud. All rights reserved.</p>
        </footer>
      </>
)
}
