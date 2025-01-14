import { getSwapQuote } from "../getSwapQuote";

describe(getSwapQuote, () => {
  it("should throw an error if the fetch fails", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    await expect(getSwapQuote(1)).rejects.toThrow("Failed to fetch");
  });

  it("should call the quote API with the correct parameters", async () => {
    const mockFetch = vi.spyOn(global, "fetch");

    await getSwapQuote(1);

    expect(mockFetch).toHaveBeenCalledWith(
      // @ts-expect-error: Fix these custom global type definitions
      expect.urlContains(
        "/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=&amount=1000000000&slippageBps=50"
      )
    );
  });

  it("should call the quote API with auto slippage when highly volatile", async () => {
    const mockFetch = vi.spyOn(global, "fetch");

    await getSwapQuote(1, { highVolatility: true });

    expect(mockFetch).toHaveBeenCalledWith(
      // @ts-expect-error: Fix these custom global type definitions
      expect.urlContains(
        "/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=&amount=1000000000&autoSlippage=true&maxAutoSlippageBps=100"
      )
    );
  });
});
