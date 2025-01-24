import InfoCard from "@/components/ui/info-card";
import HeaderSection from "@/components/ui/header";

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

const InfoSection = () => {
    return (
        <section id="info" className="pt-20">
            <div className="container mx-auto px-6 text-center">
                <HeaderSection title={"Want to know more?"} subtitle={"Find out more about how Decent Cloud works and its unique features."}/>

                <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                    {infoSections.map((section, index) => (
                        <InfoCard key={index} {...section} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
