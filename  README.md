# Solana Message Hub

The Solana Message Hub is a decentralized application (DApp) that enables users to store and manage messages securely on the Solana blockchain. This repository contains a smart contract written in Rust using the Anchor framework and a frontend interface built with Next.js and TypeScript for interacting with the deployed contract.

## Features

- Create and update messages on the Solana blockchain.
- Secure and immutable message storage.
- User-friendly interface for interacting with the message hub.

## Technologies Used

- Solana Blockchain
- Rust (Anchor framework)
- Next.js
- TypeScript

## Getting Started

### Prerequisites

- Node.js (with yarn)
- Rust
- Solana Tool Suite

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/solana-message-hub-dapp.git
   cd solana-message-hub

2. Deploy the smart contract (solana_message_hub.rs) on the Solana Devnet.

   ```bash
   anchor build
   anchor deploy

3. Install frontend dependencies and start the development server:

   ```bash
   yarn
   yarn run dev

4. Open your browser and go to http://localhost:3000 to access the Solana Message Hub DApp.

### Usage
1. Use the Next.js frontend to create and update messages.
2. Interact with the deployed smart contract on the Solana blockchain.

### Contributing
Contributions to the Solana Message Hub project are welcome! If you have ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.