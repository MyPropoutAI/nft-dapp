import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const contractAddress = "0xf4a02703f125EDC2bf1518c4398B8766ec3212Ba"; // Replace with your contract address
    const contractABI = [
        // ... (your existing ABI)
    ];

    useEffect(() => {
        if (window.ethereum) {
            const newProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(newProvider);
        } else {
            alert('Please install MetaMask!');
        }
    }, []);

    const connectWallet = async () => {
        if (provider) {
            const accounts = await provider.send("eth_requestAccounts", []);
            setWalletAddress(accounts[0]);
            const newSigner = provider.getSigner();
            setSigner(newSigner);
        }
    };

    const mintNFT = async () => {
        if (signer) {
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const recipient = "0xRecipientAddress"; // Replace with actual recipient address
            const membershipType = 0; // Replace with actual membership type
            const royaltyPercentage = 5; // Replace with actual royalty percentage

            const tx = await contract.mintNFT(recipient, membershipType, royaltyPercentage);
            await tx.wait();
            alert('NFT Minted!');
        }
    };

    return (
        <div>
            <h1>PropNFT DApp</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && <div>Connected: {walletAddress}</div>}
            <button onClick={mintNFT}>Mint NFT</button>
        </div>
    );
}