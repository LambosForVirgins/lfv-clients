import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { getEnvironmentEndpoint } from "@/utils/config/getEnvironmentEndpoint";

// const buildEnvironment = process.env.VERCEL_ENV || "development";

const local = false;
const endpoint = local ? "http://127.0.0.1:8899" : clusterApiUrl("devnet");

const wallets = [
  new walletAdapterWallets.TrustWalletAdapter(),
  new walletAdapterWallets.PhantomWalletAdapter(),
];

export const SolanaProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
