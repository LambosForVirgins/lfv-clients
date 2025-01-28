import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const endpoint = process.env.SOLANA_RPC_URL || clusterApiUrl("devnet");

const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

export const SolanaProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
