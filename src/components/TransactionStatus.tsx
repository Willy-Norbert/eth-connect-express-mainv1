
import React, { useState, useEffect } from "react";
import { getProvider } from "@/lib/web3";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, Loader2, AlertCircle } from "lucide-react";
import { ethers } from "ethers";

interface TransactionStatusProps {
  txHash: string;
  onComplete: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ txHash, onComplete }) => {
  const [status, setStatus] = useState<"pending" | "confirmed" | "error">("pending");
  const [receipt, setReceipt] = useState<ethers.TransactionReceipt | null>(null);
  
  useEffect(() => {
    if (!txHash) return;
    
    const checkTransaction = async () => {
      try {
        const provider = getProvider();
        if (!provider) throw new Error("Provider not available");
        
        // Wait for transaction to be mined
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
          console.error("Transaction not found");
          setStatus("error");
          return;
        }
        
        const receipt = await provider.waitForTransaction(txHash);
        setReceipt(receipt);
        
        if (receipt.status === 1) {
          setStatus("confirmed");
          // Call onComplete after a delay to allow user to see the confirmation
          setTimeout(onComplete, 5000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error checking transaction:", error);
        setStatus("error");
      }
    };
    
    checkTransaction();
  }, [txHash, onComplete]);
  
  const getExplorerUrl = (): string => {
    // Use Etherscan for Ethereum mainnet and testnets, could expand this for other networks
    return `https://etherscan.io/tx/${txHash}`;
  };

  return (
    <Card className="w-full border glass-card backdrop-blur-sm animate-scale-in">
      <CardContent className="pt-6 pb-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 text-center">
            {status === "pending" && (
              <div className="rounded-full p-3 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            
            {status === "confirmed" && (
              <div className="rounded-full p-3 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <Check className="h-6 w-6" />
              </div>
            )}
            
            {status === "error" && (
              <div className="rounded-full p-3 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                <AlertCircle className="h-6 w-6" />
              </div>
            )}
            
            <h3 className="font-semibold text-lg">
              {status === "pending" && "Transaction Pending"}
              {status === "confirmed" && "Transaction Confirmed"}
              {status === "error" && "Transaction Failed"}
            </h3>
            
            <p className="text-sm text-muted-foreground max-w-md">
              {status === "pending" && "Your transaction is being processed on the Ethereum network. This may take a few minutes."}
              {status === "confirmed" && "Your transaction has been confirmed and is now recorded on the blockchain."}
              {status === "error" && "There was an error processing your transaction. Please check the transaction details."}
            </p>
            
            <div className="font-mono text-xs text-muted-foreground break-all max-w-sm">
              {txHash}
            </div>
            
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getExplorerUrl(), "_blank")}
                className="gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                View on Explorer
              </Button>
              
              {status !== "pending" && (
                <Button size="sm" onClick={onComplete}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionStatus;
