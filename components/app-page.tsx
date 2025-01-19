'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

interface BenefitCardProps {
  title: string;
  benefits: string[];
  index: number;
}

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
    content: `Think of us as the "Airbnb of cloud services" - just more fair and open! We're a community-driven platform 
    that's shaking up the cloud oligopoly by enabling peer-to-peer resource sharing. Say goodbye to steep pricing and 
    those pesky region-wide outages!<br/><br/>
    <strong>Key highlights:</strong><br/>
    • Provider reputations tracked in tamper-proof ledger<br/>
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
    • New block every 10 minutes<br/>
    • Reward halves every 210,000 blocks<br/>
    • Total supply: ~21M DCT`
  },
  {
    title: "Show me the money! (Tokenomics)",
    icon: "💰",
    content: `Our Decentralized Cloud Token (DCT) powers the whole ecosystem:<br/><br/>
    • <strong>Minting:</strong> New tokens every 10 mins, halving every 210k blocks<br/>
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
    description: "Easy multi-cloud deployments with consistent APIs. You're not just a customer, you're a free spirit!"
  }
];

export function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Decent Cloud</h1>
        <nav className="space-x-4">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#info" className="hover:underline">Learn More</Link>
          <Link href="#benefits" className="hover:underline">Benefits</Link>
          <Link href="https://github.com/decent-stuff/decent-cloud" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</Link>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20">
          <motion.h2
            className="text-5xl font-bold mb-6"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Decent Cloud
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where the sky's not the limit, it's just the beginning!
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold hover:bg-purple-100 transition duration-300">
              <Link href="https://github.com/orgs/decent-stuff/discussions">
                Get Started
              </Link>
            </Button>
          </motion.div>
        </section>

        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-white bg-opacity-10 p-6 rounded-lg ${index === activeFeature ? 'ring-2 ring-purple-400' : ''}`}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-2xl font-bold mb-4">For Developers</h4>
              <ul className="list-disc list-inside">
                <li>Convenience: Find suitable cloud providers faster than you can say "404 not found"</li>
                <li>Trust: Obtain legal guarantees and SLAs worth the digital paper they're written on</li>
                <li>No vendor lock-in: Easy multi-cloud deployments with consistent APIs</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg"
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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

      <footer className="text-center py-6 bg-black bg-opacity-30">
        <p>&copy; 2025 Decent Cloud. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white bg-opacity-10 p-6 rounded-lg"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p>{description}</p>
    </motion.div>
  )
}

function BenefitCard({ title, benefits, index }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white bg-opacity-10 p-6 rounded-lg"
    >
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <ul className="list-disc list-inside space-y-2">
        {benefits.map((benefit, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {benefit}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
