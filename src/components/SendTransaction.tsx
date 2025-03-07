
import React, { useState } from "react";
import { sendTransaction } from "@/lib/web3";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SendHorizontal, AlertCircle } from "lucide-react";

interface SendTransactionProps {
  onTransactionStart: (txHash: string) => void;
}

const SendTransaction: React.FC<SendTransactionProps> = ({ onTransactionStart }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const validateAmount = (amount: string): boolean => {
    return !isNaN(Number(amount)) && Number(amount) > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!validateAddress(recipient)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    if (!validateAmount(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    try {
      const tx = await sendTransaction({
        to: recipient,
        value: amount
      });
      
      toast({
        title: "Transaction Sent",
        description: "Transaction has been sent to the network",
      });
      
      onTransactionStart(tx.hash);
      
      // Reset form
      setRecipient("");
      setAmount("");
    } catch (error: any) {
      console.error("Transaction error:", error);
      setError(error.message || "Failed to send transaction");
      
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: error.message || "Failed to send transaction",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full glass-card backdrop-blur-sm shadow-sm hover-lift eth-transition">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Send ETH</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isLoading}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0"
              placeholder="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              className="font-mono"
            />
          </div>
          
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <span className="text-destructive">{error}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isLoading || !recipient || !amount}
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="eth-spinner mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <SendHorizontal className="mr-2 h-4 w-4" />
                Send Transaction
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SendTransaction;
