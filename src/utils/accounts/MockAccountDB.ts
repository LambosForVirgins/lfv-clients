class MockAccountsDB {
  private _accounts: number[] = [10];

  async getBalance(address: number) {
    if (!this._accounts[address]) throw new Error("Account not found");
    return this._accounts[address];
  }

  async addBalance(address: number, amount: number) {
    if (!this._accounts[address]) throw new Error("Account not found");
    this._accounts[address] += amount;
  }

  async removeBalance(address: number, amount: number) {
    if (!this._accounts[address]) throw new Error("Account not found");
    this._accounts[address] -= amount;
  }
}

export const AccountDB = new MockAccountsDB();
