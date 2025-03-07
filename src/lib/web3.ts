
import { ethers } from "ethers";

// Types
export type EthereumWindow = Window & {
  ethereum?: any;
}

export type Web3Provider = ethers.BrowserProvider;
export type Web3Signer = ethers.JsonRpcSigner;

export interface TransactionRequest {
  to: string;
  value: string; // in ETH
}

export interface TransactionResponse {
  hash: string;
  wait: () => Promise<ethers.TransactionReceipt>;
}

// Initialize provider
export const getProvider = (): Web3Provider | null => {
  if (typeof window !== "undefined") {
    const ethereumWindow = window as EthereumWindow;
    if (ethereumWindow.ethereum) {
      return new ethers.BrowserProvider(ethereumWindow.ethereum);
    }
  }
  return null;
};

// Connect wallet
export const connectWallet = async (): Promise<string[]> => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error("No Ethereum browser extension detected");
    }
    
    // Request account access
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

// Get account
export const getAccount = async (): Promise<string | null> => {
  try {
    const provider = getProvider();
    if (!provider) return null;
    
    const accounts = await provider.send("eth_accounts", []);
    return accounts[0] || null;
  } catch (error) {
    console.error("Error getting account:", error);
    return null;
  }
};

// Get balance
export const getBalance = async (address: string): Promise<string> => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error("Provider not available");
    
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};

// Send transaction
export const sendTransaction = async (transaction: TransactionRequest): Promise<TransactionResponse> => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error("Provider not available");
    
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to: transaction.to,
      value: ethers.parseEther(transaction.value)
    });
    
    return tx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  const ethereumWindow = window as EthereumWindow;
  return typeof ethereumWindow.ethereum !== 'undefined';
};

// Listen for account changes
export const listenForAccountChanges = (callback: (accounts: string[]) => void): void => {
  const ethereumWindow = window as EthereumWindow;
  if (ethereumWindow.ethereum) {
    ethereumWindow.ethereum.on('accountsChanged', callback);
  }
};

// Listen for chain changes
export const listenForChainChanges = (callback: (chainId: string) => void): void => {
  const ethereumWindow = window as EthereumWindow;
  if (ethereumWindow.ethereum) {
    ethereumWindow.ethereum.on('chainChanged', callback);
  }
};

// Get network name
export const getNetworkName = async (): Promise<string> => {
  try {
    const provider = getProvider();
    if (!provider) return "Unknown";
    
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    
    switch (chainId.toString()) {
      case "1": return "Ethereum Mainnet";
      case "5": return "Goerli Testnet";
      case "11155111": return "Sepolia Testnet";
      case "137": return "Polygon Mainnet";
      case "80001": return "Mumbai Testnet";
      case "42161": return "Arbitrum One";
      case "43114": return "Avalanche C-Chain";
      case "56": return "BNB Smart Chain";
      case "250": return "Fantom Opera";
      case "10": return "Optimism";
      default: return `Chain ID: ${chainId}`;
    }
  } catch (error) {
    console.error("Error getting network:", error);
    return "Unknown";
  }
};

// Format address for display
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
