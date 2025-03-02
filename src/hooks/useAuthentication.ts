import { memberAuthorizedSelector } from "@/state/subscription/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useAuthentication = () => {
  const { connected } = useWallet();

  const isAuthorized = useRecoilValue(memberAuthorizedSelector);

  const authenticated = useMemo(() => {
    return connected && !!isAuthorized;
  }, [connected, isAuthorized]);

  return {
    authenticated,
  };
};
