import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, CodeIcon } from "lucide-react";

const ProjectShowcase = () => {
  return (
    <Card className="w-full border glass-card backdrop-blur-sm animate-fade-in mb-8">
      <CardContent className="pt-6 pb-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full p-3 bg-rwanda-green/20 text-rwanda-green dark:bg-rwanda-green/40 dark:text-rwanda-green/90">
              <CodeIcon className="h-6 w-6" />
            </div>
            
            <h2 className="font-bold text-2xl">Ethereum Wallet Interaction dApp</h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This decentralized application demonstrates how to interact with the Ethereum blockchain. 
              Connect your Ethereum wallet, check your balance, and send ETH to any address with real-time transaction tracking.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mt-2">
              <div className="border rounded-lg p-3 bg-background/50 hover:bg-rwanda-blue/10 transition-colors">
                <p className="font-medium text-sm">Connect</p>
                <p className="text-xs text-muted-foreground">Securely connect your wallet</p>
              </div>
              <div className="border rounded-lg p-3 bg-background/50 hover:bg-rwanda-yellow/10 transition-colors">
                <p className="font-medium text-sm">View</p>
                <p className="text-xs text-muted-foreground">Check your ETH balance</p>
              </div>
              <div className="border rounded-lg p-3 bg-background/50 hover:bg-rwanda-green/10 transition-colors">
                <p className="font-medium text-sm">Send</p>
                <p className="text-xs text-muted-foreground">Transfer ETH to any address</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Button variant="outline" size="sm" className="gap-2 border-rwanda-blue/50 hover:bg-rwanda-blue/10">
                <GithubIcon className="h-4 w-4" />
                View Source
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-rwanda-green/50 hover:bg-rwanda-green/10">
                <LinkedinIcon className="h-4 w-4" />
                Connect with me
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-1">
              <div className="h-2 w-8 rounded-full bg-rwanda-blue"></div>
              <div className="h-2 w-8 rounded-full bg-rwanda-yellow"></div>
              <div className="h-2 w-8 rounded-full bg-rwanda-green"></div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Created by <span className="font-semibold">Irabaruta</span> | Ethereum Web3 Hackathon Project
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectShowcase;
