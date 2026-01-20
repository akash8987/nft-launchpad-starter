const hre = require("hardhat");

async function main() {
  // 1. Setup Deployment
  // In production, upload images to IPFS (Pinata) and put the CID here.
  // Example: "ipfs://QmYourHashHere/"
  const initialBaseURI = "https://my-json-server.typicode.com/demo/metadata/";

  const CyberNFT = await hre.ethers.getContractFactory("CyberNFT");
  const nft = await CyberNFT.deploy(initialBaseURI);

  await nft.waitForDeployment();

  console.log(`CyberNFT deployed to: ${nft.target}`);
  console.log(`Base URI set to: ${initialBaseURI}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
