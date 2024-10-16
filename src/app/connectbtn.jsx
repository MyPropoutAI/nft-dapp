import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./thirdweb";

const wallets = [
  createWallet("io.metamask"),
  
];

const Connectbuttoncmpt = ()=> {
  return (
    <div>
      {/* Use ConnectButton */}
      <ConnectButton client={client} wallets={wallets} />

      
    </div>
  );
}

export default Connectbuttoncmpt;
