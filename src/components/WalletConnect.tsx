import React, { useState, useEffect } from "react";
import { connectWallet, getAccount, isMetaMaskInstalled, formatAddress } from "@/lib/web3";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet, ExternalLink, Shield } from "lucide-react";

interface WalletConnectProps {
  onConnect: (account: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(true);
  const [hoverState, setHoverState] = useState(false);
  const { toast } = useToast();

  // Check if MetaMask is installed on mount
  useEffect(() => {
    setIsMetaMaskAvailable(isMetaMaskInstalled());
    
    // Check if already connected
    const checkConnection = async () => {
      const account = await getAccount();
      if (account) {
        setConnectedAccount(account);
        onConnect(account);
      }
    };
    
    checkConnection();
  }, [onConnect]);

  // Handle wallet connection
  const handleConnect = async () => {
    if (!isMetaMaskAvailable) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    
    try {
      const accounts = await connectWallet();
      if (accounts && accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        onConnect(accounts[0]);
        
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${formatAddress(accounts[0])}`,
        });
      }
    } catch (error: any) {
      console.error("Connection error:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message || "Could not connect to wallet",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  if (connectedAccount) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <div 
          className="flex items-center bg-secondary py-2 px-4 rounded-full hover:bg-secondary/80 cursor-pointer transition-all duration-300 hover:shadow-md"
          onMouseEnter={() => setHoverState(true)} 
          onMouseLeave={() => setHoverState(false)}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></div>
          <span className="text-sm font-medium">{formatAddress(connectedAccount)}</span>
          {hoverState && (
            <Shield className="ml-2 w-4 h-4 text-rwanda-blue dark:text-rwanda-yellow animate-fade-in" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="relative overflow-hidden group"
        size="lg"
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isConnecting ? (
            <>
              <div className="eth-spinner mr-2"></div>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className={`w-5 h-5 transition-transform duration-300 ${hoverState ? 'scale-110' : ''}`} />
              {isMetaMaskAvailable ? "Connect Wallet" : "Install MetaMask"}
            </>
          )}
        </span>
        {!isMetaMaskAvailable && (
          <div className="mt-2 text-xs flex items-center gap-1 animate-fade-in">
            <ExternalLink className="w-3 h-3" />
            <span>Opens in new window</span>
          </div>
        )}
        
        {hoverState && isMetaMaskAvailable && !isConnecting && (
          <div className="absolute inset-0 bg-gradient-to-r from-rwanda-blue via-rwanda-yellow to-rwanda-green opacity-20 animate-pulse"></div>
        )}
      </Button>
      
      {hoverState && isMetaMaskAvailable && !isConnecting && !connectedAccount && (
        <p className="text-xs mt-2 text-rwanda-blue dark:text-rwanda-yellow animate-fade-in">
          Securely connect your Ethereum wallet
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
