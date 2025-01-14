class BrandVariables {
  get tokenSymbol(): string {
    return process.env.NEXT_PUBLIC_TOKEN_SYMBOL ?? "VIRGIN";
  }

  get tokenName(): string {
    return process.env.NEXT_PUBLIC_TOKEN_NAME ?? "LambosForVirgins";
  }

  get displayName(): string {
    return process.env.NEXT_PUBLIC_DISPLAY_NAME ?? "Lambos For Virgins";
  }

  get slogan(): string {
    return (
      process.env.NEXT_PUBLIC_SLOGAN ??
      "The coin for the people who don't get any."
    );
  }

  get contractAddress(): string {
    return process.env.NEXT_PUBLIC_MINT_ADDRESS ?? "";
  }
}

export const Brand = new BrandVariables();
