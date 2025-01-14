export enum SwapErrorCode {
  Unknown = 100,
  Aborted = 200,
  InsufficientBalance = 300,
  Timeout = 400,
}

export class SwapError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = "SwapError";
  }

  static fromError(error: any): SwapError {
    if (error instanceof Error) {
      switch (error.name) {
        case "WalletSignTransactionError":
          return new SwapError(SwapErrorCode.Aborted, error.message);
        case "TransactionExpiredBlockheightExceededError":
          return new SwapError(SwapErrorCode.Timeout, "Transaction expired");
      }
    }

    return new SwapError(0, "Swap transaction failed");
  }
}
