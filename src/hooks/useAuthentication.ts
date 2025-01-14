import { memberAuthorizedSelector } from "@/state/member/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useAuthentication = () => {
  const { connected, publicKey } = useWallet();

  const memberState = useRecoilValue(memberAuthorizedSelector(publicKey));

  const authenticated = useMemo(() => {
    return connected && !!memberState;
  }, [connected, memberState]);

  return {
    authenticated,
  };
};
