"use client"
import { useEffect, useState } from 'react';
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import Connectbuttoncmpt from './connectbtn';
import { useSendTransaction } from "thirdweb/react";

import { client, liskSepolia } from './thirdweb';
import Modal from 'react-modal';
import { comma } from 'postcss/lib/list';
import { useActiveAccount, useReadContract } from "thirdweb/react";



export default function Home() {
    const [walletAddress, setWalletAddress] = useState('');
    const [nftDetails, setNftDetails] = useState('');
    const [recipient, setRecipient] = useState('');
    const [membershipType, setMembershipType] = useState('0');
    const [royaltyPercentage, setRoyaltyPercentage] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [whitelistAddresses, setWhitelistAddresses] = useState('');
    const [whitelistMembershipType, setWhitelistMembershipType] = useState('0');
    const contractAddress = "0x12D77B8ea61863E478Aa6B766f489Af5F7a95aa7"; 

    const [isMintModalOpen, setMintModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isOpenMintModalOpen, setOpenMintModalOpen] = useState(false);
    // const activeAccount = useActiveAccount();
    // console.log("address", activeAccount?.address);
    const { mutate: sendTx } = useSendTransaction();
    const mintNFT = async () => {
        const contract = getContract({
            client,
            address: contractAddress,
            chain: liskSepolia,
        });
        
        try {
          
          const transaction = prepareContractCall({
              contract,
              method: "function mintNFT(address to)",
              params: [recipient],
            });
            const result = await sendTx(transaction); // Await the sendTx call
          
          console.log("result", result)
          alert('Minted successfully ' + result.transactionHash);
          setMintModalOpen(false);

      } catch (error) {
          console.log("error", error)
          alert(`Error Minting: ${error.message}`);
      }
    };

    const getNFTDetails = async () => {
        
            const contract = getContract({
                client,
                address: contractAddress,
                chain: liskSepolia,
            });

            try {
              const { data, isLoading } = useReadContract({
                contract,
                method: "fuunction getNFTDetails(uint256 tokenId) returns (uint8, uint256)",
                params: [tokenId],
              },
            );
            console.log("result", data)
            } catch (error) {
                alert(`Error Fetching Details: ${error.message}`);
            }
        
    };

    

    const openMint = async () => {
      const contract = getContract({
        client,
        address: contractAddress,
        chain: liskSepolia,
      });

      // Split the comma-separated addresses into an array
      const addresses = whitelistAddresses.split(',').map(address => address.trim());
      try {
          
          const transaction = prepareContractCall({
              contract,
              method: "function openMint(address[] addresses, uint8[] membershipTypes)",
              params: [addresses, Array(addresses.length).fill(Number(whitelistMembershipType))],
          });
          const result = await sendTx(transaction); // Await the sendTx call
          
          console.log("result", result)
          alert('Minting Opened for Addresses! Transaction Hash: ' + result.transactionHash);
          setOpenMintModalOpen(false);

      } catch (error) {
          console.log("error", error)
          alert(`Error Opening Mint: ${error.message}`);
      }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">PropNFT DApp</h1>
            <div>
                <Connectbuttoncmpt />
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setMintModalOpen(true)}>Mint NFT</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-4" onClick={() => setDetailsModalOpen(true)}>Get NFT Details</button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded mt-4" onClick={() => setOpenMintModalOpen(true)}>Open Mint for Addresses</button>

            {/* Mint Modal */}
            <Modal isOpen={isMintModalOpen} onRequestClose={() => setMintModalOpen(false)}>
                <h2 className="text-2xl font-bold">Mint NFT</h2>
                <input className="border p-2 w-full mb-2" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient Address" />
                <select className="border p-2 w-full mb-2" value={membershipType} onChange={(e) => setMembershipType(e.target.value)}>
                    <option value="0">Common</option>
                    <option value="1">Rare</option>
                    <option value="2">Uncommon</option>
                    <option value="3">Native</option>
                </select>
                <input className="border p-2 w-full mb-2" type="number" value={royaltyPercentage} onChange={(e) => setRoyaltyPercentage(e.target.value)} placeholder="Royalty Percentage" />
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={mintNFT}>Mint NFT</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => setMintModalOpen(false)}>Close</button>
            </Modal>

            {/* Details Modal */}
            <Modal isOpen={isDetailsModalOpen} onRequestClose={() => setDetailsModalOpen(false)}>
                <h2 className="text-2xl font-bold">Get NFT Details</h2>
                <input className="border p-2 w-full mb-2" type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Token ID" />
                <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={getNFTDetails}>Get Details</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => setDetailsModalOpen(false)}>Close</button>
                {nftDetails && <div className="mt-2">{nftDetails}</div>}
            </Modal>

            {/* Open Mint Modal */}
            <Modal isOpen={isOpenMintModalOpen} onRequestClose={() => setOpenMintModalOpen(false)}>
                <h2 className="text-2xl font-bold">Open Mint for Addresses</h2>
                <input className="border p-2 w-full mb-2" type="text" value={whitelistAddresses} onChange={(e) => setWhitelistAddresses(e.target.value)} placeholder="Comma separated addresses" />
                <select className="border p-2 w-full mb-2" value={whitelistMembershipType} onChange={(e) => setWhitelistMembershipType(e.target.value)}>
                    <option value="0">Common</option>
                    <option value="1">Rare</option>
                    <option value="2">Uncommon</option>
                    <option value="3">Native</option>
                </select>
                <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={openMint}>Open Mint</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => setOpenMintModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}
