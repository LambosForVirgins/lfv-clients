import { createJupiterAdapter } from "./jupiter/JupiterExchangeAdapter";
import { createRaydiumAdapter } from "./radium/RaydiumExchangeAdapter";

const exchanges = [createRaydiumAdapter(), createJupiterAdapter()];

export const useExchange = () => {
  return {
    exchanges,
  };
};
