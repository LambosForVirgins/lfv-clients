import { ExchangeAdapter, type ExchangeName } from "../ExchangeAdapter";
import { VIRGINTokenMint } from "../tokens";

const JupiterExchangeName = "Jupiter" as ExchangeName<"Jupiter">;

class JupiterExchangeAdapter extends ExchangeAdapter {
  name = JupiterExchangeName;
  url = `https://jup.ag/swap/SOL-${VIRGINTokenMint}`;
  icon = "/images/jupiter.png";
}

export const createJupiterAdapter = () => new JupiterExchangeAdapter();
