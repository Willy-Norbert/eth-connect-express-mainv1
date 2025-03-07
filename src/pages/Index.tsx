import React, { useState } from "react";
import Header from "@/components/Header";
import WalletConnect from "@/components/WalletConnect";
import Balance from "@/components/Balance";
import SendTransaction from "@/components/SendTransaction";
import TransactionStatus from "@/components/TransactionStatus";
import Card from "@/components/Card";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, AlertTriangle } from "lucide-react";

const Index = () => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleConnect = (account: string) => {
    setConnectedAccount(account);
  };

  const handleTransactionStart = (txHash: string) => {
    setTransactionHash(txHash);
  };

  const handleTransactionComplete = () => {
    setTransactionHash(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6">
      <Header />
      
      <main className="w-full max-w-3xl mx-auto mt-8 pb-20 space-y-8">
        
        
        {!connectedAccount ? (
          <section className="space-y-8 animate-fade-in">
            <Card className="text-center space-y-6 py-12">
              <h2 className="text-3xl font-bold tracking-tight text-balance">
                Ethereum Wallet Interaction
              </h2>
              <p className="text-ye max-w-md mx-auto text-balance">
                Connect your wallet to view your ETH balance and send transactions on the Ethereum network.
              </p>
              
              <div className="flex items-center justify-center pt-4">
                <WalletConnect onConnect={handleConnect} />
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                title="Connect" 
                description="Securely connect your Ethereum wallet using MetaMask or any Web3 provider."
                icon={<div className="bg-blue-100 p-3 rounded-full text-blue-600"><Wallet className="h-6 w-6" /></div>}
              />
              <FeatureCard 
                title="View" 
                description="Check your ETH balance and transaction history across multiple networks."
                icon={<div className="bg-purple-100 p-3 rounded-full text-purple-600"><Eye className="h-6 w-6" /></div>}
              />
              <FeatureCard 
                title="Send" 
                description="Easily send ETH to any address with real-time transaction tracking."
                icon={<div className="bg-green-100 p-3 rounded-full text-green-600"><SendHorizontal className="h-6 w-6" /></div>}
              />
            </div>
            
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">This is a demo application</p>
                <p className="mt-1">Be careful when connecting your wallet to any dApp. Always verify you're on the correct website before connecting.</p>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6 animate-fade-in">
            {transactionHash ? (
              <TransactionStatus 
                txHash={transactionHash} 
                onComplete={handleTransactionComplete} 
              />
            ) : (
              <>
                <Balance address={connectedAccount} />
                
                <div className="py-4">
                  <Separator />
                </div>
                
                <SendTransaction onTransactionStart={handleTransactionStart} />
              </>
            )}
          </section>
        )}
      </main>
      <ProjectShowcase />
    </div>
    
  );
};

// Helper component for feature cards
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="border text-yellow-200 rounded-xl p-6 bg-gray-900 backdrop-blur-sm hover-lift">
      <div className="space-y-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-blue-400">{description}</p>
      </div>
      
    </div>
  );
};

// Import missing icons
import { Wallet, Eye, SendHorizontal } from "lucide-react";

export default Index;
