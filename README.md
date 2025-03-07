# Ethereum Wallet Interaction dApp

A decentralized application that allows users to interact with the Ethereum blockchain through an intuitive and user-friendly interface.

## Project Overview

This dApp demonstrates how modern web technologies can be combined with blockchain protocols to create seamless Web3 experiences. The application allows users to:

- Connect their Ethereum wallet (MetaMask or any Web3 compatible wallet)
- View their ETH balance on the Ethereum network
- Send ETH to any valid Ethereum address
- Track transaction status in real-time

## Features

### Wallet Connection
Securely connect your Ethereum wallet with just one click. The application detects if you have MetaMask installed and guides you through the connection process.

### Balance Checking
Once connected, instantly view your ETH balance. The application automatically updates your balance and shows the current network you're connected to.

### Transaction Sending
Easily send ETH to any Ethereum address. The intuitive form ensures you input the correct information before submitting the transaction.

### Real-time Transaction Tracking
After sending a transaction, monitor its status in real-time. Get notified when your transaction is confirmed on the blockchain.

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type-safe code
- **Ethers.js**: For interacting with the Ethereum blockchain
- **TailwindCSS**: For responsive styling
- **Shadcn/UI**: For consistent UI components

## How It Works

1. **Connect Your Wallet**: Click the "Connect Wallet" button to link your Ethereum wallet to the application.
2. **View Your Balance**: Once connected, your ETH balance will be displayed automatically.
3. **Send ETH**: Enter the recipient's address and amount to send ETH to another wallet.
4. **Track Transaction**: Monitor the status of your transaction until it's confirmed on the blockchain.

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Make sure you have MetaMask or another Web3 wallet installed in your browser
5. Connect your wallet and start interacting with the Ethereum blockchain!

## Security Considerations

- This application never stores your private keys
- All transactions are signed securely through your wallet provider
- Always verify transaction details before confirming

## Created By

This project was designed and developed by **Irabaruta** for the Ethereum Web3 Hackathon.

## License

MIT License