'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

interface BenefitCardProps {
  title: string;
  benefits: string[];
}

export function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Decent Cloud</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="hover:text-purple-200">Features</Link></li>
              <li><Link href="#benefits" className="hover:text-purple-200">Benefits</Link></li>
              <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-200">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-indigo-800 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Decent Cloud</h1>
            <div className="space-y-4 max-w-3xl mx-auto mb-8">
              <p className="text-xl">Use tech you already know and trust</p>
              <p className="text-xl">On servers with SLAs, that you can trust</p>
              <p className="text-xl">From companies with reputation, that you can trust</p>
              <div className="text-xl font-bold mt-6">
                And all of that...
                <div className="text-purple-300">
                  without a vendor lock-in
                  <br />
                  and with fair and highly competitive pricing
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-100">Get Started</Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Decentralized Infrastructure"
                description="Access tailored virtual or physical servers from reputable node providers."
                imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80"
              />
              <FeatureCard
                title="Reputation-Based System"
                description="Make informed decisions with our transparent provider reputation system."
                imageUrl="https://images.unsplash.com/photo-1553484771-11998c592b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              />
              <FeatureCard
                title="Confidential Computing"
                description="Process sensitive data securely with our Confidential Computing VMs."
                imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              />
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitCard
                title="For Developers"
                benefits={[
                  "Find suitable cloud providers",
                  "Obtain legal guarantees and SLAs",
                  "Easy multi-cloud deployments"
                ]}
              />
              <BenefitCard
                title="For Node Providers"
                benefits={[
                  "Access to trillion-dollar crypto market",
                  "Reach a global user base",
                  "Fair, transparent pricing"
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8">Join the future of decentralized cloud computing today!</p>
            <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-100">
              <Link href="https://github.com/orgs/decent-cloud/discussions">Join the Discussion</Link>
            </Button>
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
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300">Contact</Link></li>
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300">Community</Link></li>
                <li><Link href="https://github.com/orgs/decent-cloud/discussions" className="hover:text-purple-300">Support</Link></li>
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

function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image src={imageUrl} width={24} height={24} alt={title} className="mr-2 w-6 h-6 object-cover rounded" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function BenefitCard({ title, benefits }: BenefitCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}