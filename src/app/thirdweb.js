import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";


const secret_key = 'z-2D5zzOFO5qaTez4CXJCZvXfFUfvB_Mo1hgky1MihInI3qt5M6cs8892-FiKgt6XyyWtRn5NpYlkstEw-vRSw'
export const client = createThirdwebClient({
    clientId: '7689015a7891cb9951eb5e957933ef90',
});


export const liskSepolia = defineChain({
    id: 4202,
    rpc: "https://rpc.sepolia-api.lisk.com",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
    
  })
