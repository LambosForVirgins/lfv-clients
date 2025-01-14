import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getMarketCap } from "../utils/exchanges/getMarketCap";
import { MINT } from "@/utils/locker/constants";

export const useMarketCap = () => {
  const { connection } = useConnection();
  const [marketCapDiluted, setMarketCapDiluted] = useState<number>(0);

  useEffect(() => {
    const getCap = async () => {
      const result = await getMarketCap(connection, MINT);

      setMarketCapDiluted(result);
    };

    getCap();
  }, []);

  return {
    marketCapDiluted,
  };
};
