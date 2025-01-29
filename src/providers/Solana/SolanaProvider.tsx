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
  return (
    <ConnectionProvider
      endpoint={
        "https://practical-multi-diamond.solana-mainnet.quiknode.pro/9b31cd9dc3d514d5e7a007861e5e5455de1b920e"
      }
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
