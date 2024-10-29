'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

interface BenefitCardProps {
  title: string;
  benefits: string[];
  index: number;
}

const STATIC_IMAGES = {
  hero: '/images/hero.jpg',
  servers: '/images/servers.jpg',
  reputation: '/images/reputation.jpg',
  security: '/images/security.jpg',
  background: '/images/background.jpg',
} as const;

export function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentTop = heroRef.current?.offsetHeight ?? 0;
    window.scrollTo({ top: contentTop, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-purple-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">Decent Cloud</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#features" className="text-white/90 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#benefits" className="text-white/90 hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="https://decent-cloud.github.io/website/decent-cloud-whitepaper.pdf" className="text-white/90 hover:text-white transition-colors">Whitepaper</Link></li>
              <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="text-white/90 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ y: heroY }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src={STATIC_IMAGES.hero}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-900/50 to-purple-900/90" />
          </motion.div>

          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">Welcome to Decent Cloud</h1>
              <div className="space-y-4 max-w-3xl mx-auto mb-8 text-white/90">
                <p className="text-xl md:text-2xl">Use tech you already know and trust</p>
                <p className="text-xl md:text-2xl">On servers with SLAs, that you can trust</p>
                <p className="text-xl md:text-2xl">From companies with reputation, that you can trust</p>
                <div className="text-xl md:text-2xl font-bold mt-6">
                  And all of that...
                  <div className="text-purple-300">
                    without a vendor lock-in
                    <br />
                    and with fair and highly competitive pricing
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-purple-800 hover:bg-purple-100 transform hover:scale-105 transition-all"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8" />
            </motion.div>
          </button>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Decentralized Infrastructure",
                  description: "Access tailored virtual or physical servers from reputable node providers.",
                  imageUrl: STATIC_IMAGES.servers
                },
                {
                  title: "Reputation-Based System",
                  description: "Make informed decisions with our transparent provider reputation system.",
                  imageUrl: STATIC_IMAGES.reputation
                },
                {
                  title: "Confidential Computing",
                  description: "Process sensitive data securely with our Confidential Computing VMs.",
                  imageUrl: STATIC_IMAGES.security
                }
              ].map((feature, index) => (
                <FeatureCard key={index} {...feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={STATIC_IMAGES.background}
              alt=""
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitCard
                title="For Developers"
                benefits={[
                  "Find suitable cloud providers",
                  "Obtain legal guarantees and SLAs",
                  "Easy multi-cloud deployments"
                ]}
                index={0}
              />
              <BenefitCard
                title="For Node Providers"
                benefits={[
                  "Access to trillion-dollar crypto market",
                  "Reach a global user base",
                  "Fair, transparent pricing"
                ]}
                index={1}
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20 relative">
          <div className="absolute inset-0">
            <Image
              src={STATIC_IMAGES.hero}
              alt=""
              fill
              className="object-cover mix-blend-overlay opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/80 to-indigo-800/80" />
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-xl mb-8">Join the future of decentralized cloud computing today!</p>
              <Button 
                size="lg" 
                className="bg-white text-purple-800 hover:bg-purple-100 transform hover:scale-105 transition-all"
              >
                <Link href="https://github.com/orgs/decent-cloud/discussions">
                  Join the Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Decent Cloud</h3>
              <p>Bridging the gap in cloud computing</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="https://decent-cloud.github.io/website/decent-cloud-whitepaper.pdf" className="hover:text-purple-300 transition-colors">Whitepaper</Link></li>
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300 transition-colors">Contact</Link></li>
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300 transition-colors">Community</Link></li>
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300 transition-colors">Support</Link></li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Decent Cloud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, imageUrl, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 w-full overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardHeader className="relative -mt-16 bg-white/95 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/98">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
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
    >
      <Card className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-700 to-indigo-800 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
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
        </CardContent>
      </Card>
    </motion.div>
  )
}