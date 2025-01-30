import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { solanaRpcUrl } from "@/utils/locker/constants";

const endpoint = solanaRpcUrl();

const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

export const SolanaProvider = ({ children }: React.PropsWithChildren) => {
  console.log("Provider env", import.meta.env);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
