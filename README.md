# NFT Launchpad Starter

This repository is a flat-structure toolkit for launching an NFT collection (ERC-721). It includes the smart contract logic, a script to simulate generating metadata for 10,000 items, and a frontend to mint the tokens.

## Features
- **ERC-721A Implementation:** Optimized for low gas costs when minting multiple NFTs.
- **Metadata Generator:** Node.js script to generate JSON metadata files automatically.
- **Whitelisting:** Merkle-tree compatible structure (simplified for this demo to owner-only for ease).
- **Withdraw Functionality:** Securely withdraw ETH to the owner's wallet.

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
