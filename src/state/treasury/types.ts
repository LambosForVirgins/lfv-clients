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
