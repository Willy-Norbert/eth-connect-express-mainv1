
import React, { useState, useEffect } from "react";
import { getBalance, getNetworkName } from "@/lib/web3";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Coins } from "lucide-react";

interface BalanceProps {
  address: string;
}

const Balance: React.FC<BalanceProps> = ({ address }) => {
  const [balance, setBalance] = useState<string>("0");
  const [network, setNetwork] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBalanceAndNetwork = async () => {
      if (!address) return;
      
      setIsLoading(true);
      try {
        // Get balance
        const balanceResult = await getBalance(address);
        setBalance(balanceResult);
        
        // Get network
        const networkResult = await getNetworkName();
        setNetwork(networkResult);
      } catch (error: any) {
        console.error("Error fetching balance:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch your balance. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalanceAndNetwork();
    
    // Refresh balance every 15 seconds
    const interval = setInterval(fetchBalanceAndNetwork, 15000);
    
    return () => clearInterval(interval);
  }, [address, toast]);

  return (
    <Card className="w-full overflow-hidden border glass-card backdrop-blur-sm shadow-sm hover-lift eth-transition">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-eth" />
              <h3 className="font-medium text-lg">Your Balance</h3>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-secondary">
              {network}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-4">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="eth-spinner"></div>
                <p className="text-sm text-muted-foreground">Fetching balance...</p>
              </div>
            ) : (
              <>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight">
                    {parseFloat(balance).toFixed(4)}
                  </span>
                  <span className="ml-1 text-xl font-medium text-muted-foreground">ETH</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {address && `Connected to ${address.substring(0, 8)}...${address.substring(address.length - 6)}`}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
