export enum VestingStatus {
  Pending,
  Active,
  Completed,
}

export type VestingSchedule = {
  key: string;
  releaseTime: Date;
  amount: number;
  status: VestingStatus;
};

export type VestingAccount = {
  destinationAddress: string;
  mintAddress: string;
  schedules: VestingSchedule[];
};

export enum TreasuryType {
  Operational = "operational",
  Capital = "capital",
}

export enum TreasuryCategory {
  External = "external",
  Operational = "operational",
  StrategicReserves = "strategic-reserves",
  GrowthIncentiveEngagement = "growth-incentive-engagement",
}

export enum TreasuryDepartment {
  Marketing = "marketing",
  // Maintains relationships with partners and stakeholders.
  Relations = "relations",
  Promotions = "promotions",
  Incentives = "incentives",
  Engineering = "engineering",
  Operations = "operations",
  Liquidity = "liquidity",
  Insurance = "insurance",
  Capital = "capital",
  Founders = "founders",
}

export type TreasuryHolding = {
  symbol: string;
  amount: number;
};

export type TreasuryWallet = {
  address: string;
  name: string;
  description?: string;
  type: TreasuryType;
  category: TreasuryCategory;
  department: TreasuryDepartment;
  holdings: TreasuryHolding[];
};

export type TreasuryWalletGroup = {
  wallets: any;
  label: string;
  // Initially allocated portion of the total supply.
  portion: number;
  description?: string | null;
  type: TreasuryType;
  category: TreasuryCategory;
  department: TreasuryDepartment;
};
