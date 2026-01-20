// A simple Node script to simulate generating metadata
const fs = require('fs');

const OUTPUT_DIR = './metadata_output';
const COUNT = 10; // Generate 10 examples

if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
}

for (let i = 1; i <= COUNT; i++) {
    const metadata = {
        name: `CyberPunk #${i}`,
        description: "A futuristic NFT from the Cyber collection.",
        image: `ipfs://PLACEHOLDER_CID/${i}.png`,
        attributes: [
            { trait_type: "Level", value: Math.floor(Math.random() * 10) },
            { trait_type: "Stamina", value: Math.floor(Math.random() * 100) }
        ]
    };

    fs.writeFileSync(`${OUTPUT_DIR}/${i}.json`, JSON.stringify(metadata, null, 2));
    console.log(`Generated metadata for #${i}`);
}
console.log("Done! Check /metadata_output folder.");
