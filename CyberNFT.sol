// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CyberNFT is ERC721A, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.01 ether;
    uint256 public constant MAX_PER_WALLET = 5;
    
    string public baseURI;
    bool public isPublicMintEnabled = false;

    constructor(string memory _initBaseURI) ERC721A("CyberPunk NFT", "CYBER") Ownable(msg.sender) {
        baseURI = _initBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 quantity) external payable {
        require(isPublicMintEnabled, "Minting not live");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Sold out");
        require(_numberMinted(msg.sender) + quantity <= MAX_PER_WALLET, "Exceeds wallet limit");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient ETH");

        _mint(msg.sender, quantity);
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function toggleMinting() external onlyOwner {
        isPublicMintEnabled = !isPublicMintEnabled;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}
