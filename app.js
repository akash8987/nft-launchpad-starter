const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ADDRESS_HERE";
// ABI for minting and checking supply
const ABI = [
    "function mint(uint256 quantity) external payable",
    "function totalSupply() view returns (uint256)",
    "function MAX_SUPPLY() view returns (uint256)"
];

let provider, signer, contract;
let mintAmount = 1;

const updateUI = async () => {
    if(!contract) return;
    try {
        const supply = await contract.totalSupply();
        const max = await contract.MAX_SUPPLY();
        document.getElementById('supply').innerText = `${supply} / ${max}`;
    } catch(e) { console.error(e); }
};

document.getElementById('connectBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        
        const address = await signer.getAddress();
        document.getElementById('connectBtn').classList.add('hidden');
        document.getElementById('mintBtn').classList.remove('hidden');
        document.getElementById('status').innerText = `Connected: ${address.slice(0,6)}...`;
        
        updateUI();
    } else {
        alert("Install MetaMask!");
    }
});

document.getElementById('mintBtn').addEventListener('click', async () => {
    if(!contract) return;
    try {
        const price = ethers.parseEther((0.01 * mintAmount).toString());
        const tx = await contract.mint(mintAmount, { value: price });
        document.getElementById('status').innerText = "Minting...";
        await tx.wait();
        document.getElementById('status').innerText = "Minted Successfully!";
        updateUI();
    } catch (err) {
        console.error(err);
        document.getElementById('status').innerText = "Error: " + (err.reason || err.message);
    }
});

// Counter Logic
document.getElementById('plus').onclick = () => { if(mintAmount < 5) { mintAmount++; document.getElementById('amount').innerText = mintAmount; }};
document.getElementById('minus').onclick = () => { if(mintAmount > 1) { mintAmount--; document.getElementById('amount').innerText = mintAmount; }};
