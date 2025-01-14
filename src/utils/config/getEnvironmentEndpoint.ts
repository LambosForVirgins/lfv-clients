import * as web3 from "@solana/web3.js";

type VercelEnvironment = "development" | "preview" | "production";

const rpcEndpoint = process.env.NEXT_RPC_PROVIDER_URL;

export const getEnvironmentEndpoint = <T extends string = VercelEnvironment>(
  environment?: T
): string => {
  // if (!rpcEndpoint) throw new Error("Missing RPC endpoint");

  switch (environment) {
    case "production":
    case "preview":
      return (
        rpcEndpoint ||
        "https://practical-multi-diamond.solana-mainnet.quiknode.pro/9b31cd9dc3d514d5e7a007861e5e5455de1b920e"
      );
    case "development":
    default:
      return "https://practical-multi-diamond.solana-mainnet.quiknode.pro/9b31cd9dc3d514d5e7a007861e5e5455de1b920e";
      return web3.clusterApiUrl("devnet");
  }
};
