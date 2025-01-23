import { memberAuthorizedSelector } from "@/state/subscription/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useAuthentication = () => {
  const { connected, publicKey } = useWallet();

  const isAuthorized = useRecoilValue(memberAuthorizedSelector(publicKey));

  const authenticated = useMemo(() => {
    return connected && !!isAuthorized;
  }, [connected, isAuthorized]);

  return {
    authenticated,
  };
};
