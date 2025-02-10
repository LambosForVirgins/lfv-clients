import { atom, atomFamily } from "recoil";
import { effectVestingAccountInformation } from "./effects";
import {
  TreasuryCategory,
  TreasuryDepartment,
  TreasuryType,
  TreasuryWallet,
  TreasuryWalletGroup,
  VestingAccount,
} from "./types";

export const vestedAccountsAtom = atom<Record<string, string[]>>({
  key: "vested-accounts-atom",
  default: {
    "5V6gdbG8ZDdCVuHvN1Q5spDDtXapPj7UezZxiAoQY4wG": [
      "r2Vvks2HWS1BF3bcKduR36mL3Z8zbzevQTeK2LcSbb3",
      "4DM2vhhkpuimLTtXKFbCHoFXiszcu27B6Hn3hNsuqqx3",
      "6Rg8oB6hHbr1yHcWsU55ULKtn1LgT2CQaLws6V7pXfjH",
      "ByohExQS9KS9E9WWcWX95yJe5sDg9vS27W8zkNHzQuFd",
    ],
    M1TsVPdju4sdtFZGmpyCk9BHRLAoPqJUHMLbRpQCstV: [
      "HVY4wfsqx8iEN5rMcGn5CEX4ePp79pmMQ5ZiqzNRzyAS",
      "CecXzbU51iYFniYwWyNk82EqQJ8F9FjiTRDSgPnr4yLY",
      "54szvVqh2n7QBCXhtQ6KCjhcLkDZXARG8F7Jjyb7K8G3",
      "BT2q8wxb5N51Q13GY9uEfgZYUmpAXgGvFEataUn85XmR",
    ],
    DdDEGsYdHCY8SwfHRHsGwriuqapkqKbao4e25LT6mRqN: [
      "6QQVDCSSucTQS3tSG3rw8EYbocPUubuZWrfqtbXPBP6c",
      "H7itb6CgNrCf75HatZWKMpzGfY7WCxawdkTvMCi7LyUU",
      "BDp3FtyEBAFM2HK7TXa5VvHfCvw9rnior5rag13Ecjg1",
      "FTbL6yzadkjirdkEEPuyYrShS3NYx8efGFAxXRY9zqee",
    ],
    CqsXtmGb9PVqGBgUwGNxqsHrVxWs8XUfhSvj5nWZLwQ9: [
      "3HZtteYTAX1Q3ipQixkZV2L92rvd8mxcA19vfqJVqFpN",
      "4KSw8CWYtTpuy3mqwWXvxk9bJBLTqXomJ9rUwhYDV1bn",
      "4o7Y2GU1X5zbx9MSZTerTCPmPdC99iavQatSMnPeBTWm",
      "BbNoKCP7q4hEJ6CHBPoV8of4DKdd4NdG9bMX9fE4g9pT",
    ],
    B6iGF9o8RusLc9363ekjPLCgd4W8Be7FSFRMAXq3ytWM: [
      "G5Sz286Em8xGCeVJdwMskUZvGEVZmkvgom2pqucmY9S3",
      "2kNivi68F3FqNX7VmwCyRUaixPoWtyu9TAkfYt8vPhP5",
      "C7gUQhj3qEQQPmYjdqVBVdmM89mJK2UYTQHnifGp6ebn",
      "Gez33hhQAqkiBeVrWwpa5BDbgt4GwxghtJ5c17J7G8To",
    ],
  },
});

export const treasuryWalletGroupsAtom = atom<TreasuryWalletGroup[]>({
  key: "treasury-wallet-groups-atom",
  default: [
    {
      label: "Marketing",
      type: TreasuryType.Operational,
      portion: 0.1,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      description:
        "To finance marketing campaigns, advertising, and brand development initiatives.",
      wallets: [],
    },
    {
      label: "Giveaway",
      type: TreasuryType.Operational,
      portion: 0.15,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Promotions,
      description:
        "Dedicated funds for community engagement activities like giveaways, contests, or other promotional events.",
      wallets: [],
    },
    {
      label: "Employee Options",
      type: TreasuryType.Operational,
      portion: 0.1,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      description:
        "Reserved funds for future employment incentives, option pools, or other benefits programs.",
      wallets: [],
    },
    {
      label: "Founders",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      portion: 0.12290502834493305,
      description:
        "Initial founding team and allocations for early contributors.",
      wallets: [],
    },
    {
      label: "Exchange",
      type: TreasuryType.Operational,
      portion: 0.16097396702002448,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Liquidity,
      wallets: [],
    },
    {
      label: "Insurance",
      type: TreasuryType.Operational,
      portion: 0.15,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      wallets: [],
    },
    {
      label: "Burn",
      portion: 0.1,
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Capital,
      wallets: [],
    },
  ],
});

export const treasuryWalletsAtom = atom<TreasuryWallet[]>({
  key: "treasury-wallets-atom",
  default: [
    {
      name: "Marketing 1",
      address: "ohi5qTiUNQaqSj6cSfUKUcsUtVJDiJAV2k2uiudzUgW",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      holdings: [
        {
          symbol: "SOL",
          amount: 0.001,
        },
        {
          symbol: "VIRGIN",
          amount: 1,
        },
      ],
    },
    {
      name: "KGEN Campaign",
      address: "LoCKtcey3kGaEMuXi6zDESgjN665ULt7MjYix8tHNuR",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 4_100_00,
        },
      ],
    },
    {
      name: "Shawn's Campaign",
      address: "",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 0,
        },
      ],
    },
    {
      name: "Marketing 2",
      address: "HySJdMWBSJ3JM99qYbnSXNsoMqCVdFUSpGk83vUV7ez2",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 13_600_000,
        },
      ],
    },
    {
      name: "Marketing 3",
      address: "D1NFfmeRK1wBtTWio3Mt7P3CzaoKCgSVfiVzZ8oS5Ybr",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      description:
        "To finance marketing campaigns, advertising, and brand development initiatives.",
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 48_146_370,
        },
      ],
    },
    {
      name: "Marketing 4",
      address: "EgWtXbPSte41YKF3P3ZxY4BstR4PT3dvGqcaxVZYEKyu",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Marketing,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 20_000_000,
        },
      ],
    },
    {
      name: "Giveaway 1",
      address: "G8YEM66BR5y2VTR1Rr2YG9qkrnMNjBYr7SCDxAka5f7C",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Promotions,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 31_603_000,
        },
      ],
    },
    {
      name: "Giveaway 2",
      address: "C2JiHF37k3MaAf2pbGxTc1dCvP2EAEZAiAFxEkLXnN3g",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Promotions,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 24_000_000,
        },
      ],
    },
    {
      name: "Giveaway 3",
      address: "4f5yb6AYefdCnrVn5m2tCnMcoRAk9kiGrgHxS49i5SST",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Promotions,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 36_853_630,
        },
      ],
    },
    {
      name: "Giveaway 4",
      address: "532tJ6cajs2B5uGpr2VsBdCrtZ11BCAi5UtNMs2oCd8E",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Promotions,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 30_000_000,
        },
      ],
    },
    {
      name: "Employee Options 1",
      address: "uh3u4wiEd7eUYMEc3424iCtv1bh4TnkewH784MSBVNd",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 77_996_342,
        },
      ],
    },
    {
      name: "Employee Options 2",
      address: "3n6upUMfHvXAJ7euo9Y1RCcidtGZpV2Zcon1icFYuYYw",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      holdings: [],
    },
    {
      name: "Employee Options 3",
      address: "FFgowhrXfECFFtPCLdGHpQP7x6gx3DXd6ANGo2hm9Lkd",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      holdings: [],
    },
    {
      name: "Employee Options 4",
      address: "DECzvw4qt5pASToTJ7cFM7Bp8hNZR9NETmtZvty9mhYu",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      holdings: [],
    },
    {
      name: "Senior Frontend Developer",
      address: "GUW4mJTJZxgohHFcrZ7wLQ3XWhaKAPtUKzcCGDerrgqL",
      type: TreasuryType.Operational,
      category: TreasuryCategory.GrowthIncentiveEngagement,
      department: TreasuryDepartment.Incentives,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 250_000,
        },
      ],
    },
    {
      name: "Exchange 1",
      address: "4jSuKwQSBQFY1YCHBGzjVdsiKZsMsZnDa11iQaWcqoxW",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Liquidity,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 49_678_000,
        },
      ],
    },
    {
      name: "Exchange 2",
      address: "KXjVSzErncrwn7UvAwM5QVjNqYS3VdgsxKKFfdh8zxK",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Liquidity,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 34_393_700,
        },
      ],
    },
    {
      name: "Exchange 3",
      address: "8FuzfNHHBYQNYrScJ4BZyWigFt2EEMrvf1jVwC3h2Kf1",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Liquidity,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 40_000_000,
        },
      ],
    },
    {
      name: "Exchange 4",
      address: "6bqH38AETusPcgFiNMkXQDfS393SgE3puhsiqytMHkcX",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Liquidity,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 20_000_000,
        },
      ],
    },
    {
      name: "Insurance 1",
      address: "Gh9SdBMkehCTBknFDsEGyaGQsbfWPBnksDCCAxrgShJN",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 32_000_000,
        },
      ],
    },
    {
      name: "Insurance 2",
      address: "EUbV8VEnchU6tQ9xx6qCPSbqiFA2kp829sWoHzDocFNb",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 30_000_000,
        },
      ],
    },
    {
      name: "Insurance 3",
      address: "A9pz6qNhVXR2SaXa9rka7pXQSFerZWsYV2sbJFgGAfd6",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 26_012_224,
        },
      ],
    },
    {
      name: "Insurance 4",
      address: "7xwz5ghZVZqUg9feAtiPFRMLNCkssNiripJwuLAU3hh9",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 26_468_300,
        },
      ],
    },
    {
      name: "Burn 1",
      address: "7pbH6mfSExZRHFuRLUxN4oFaGXgrm451VU7SLJ61yDQr",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Insurance,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 9_000_000,
        },
      ],
    },
    {
      name: "Burn 1",
      address: "7pbH6mfSExZRHFuRLUxN4oFaGXgrm451VU7SLJ61yDQr",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Capital,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 9_000_000,
        },
      ],
    },
    {
      name: "Burn 2",
      address: "DckyKc4ujKz8rWAwvuwpNK2jyHqQGYRN6gjJL1qvcF6b",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Capital,
      holdings: [],
    },
    {
      name: "Burn 3",
      address: "DbfcSjzJPjN96hfrEEZ9sbGERMYp5d3bMqwJTKTAPSAW",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Capital,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 21_002_830,
        },
      ],
    },
    {
      name: "Burn 4",
      address: "CwKrgWE1PVNfSmwCsvjp4CBM8h5AAMJTRARqcsBFK9qT",
      type: TreasuryType.Operational,
      category: TreasuryCategory.StrategicReserves,
      department: TreasuryDepartment.Capital,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 11_000_828,
        },
      ],
    },
    {
      name: "Founder 1",
      address: "5V6gdbG8ZDdCVuHvN1Q5spDDtXapPj7UezZxiAoQY4wG",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 30_000_000,
        },
      ],
    },
    {
      name: "Founder 2",
      address: "M1TsVPdju4sdtFZGmpyCk9BHRLAoPqJUHMLbRpQCstV",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 30_000_000,
        },
      ],
    },
    {
      name: "Founder 3",
      address: "DdDEGsYdHCY8SwfHRHsGwriuqapkqKbao4e25LT6mRqN",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 20_000_000,
        },
      ],
    },
    {
      name: "Founder 4",
      address: "CqsXtmGb9PVqGBgUwGNxqsHrVxWs8XUfhSvj5nWZLwQ9",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 20_000_000,
        },
      ],
    },
    {
      name: "Founder 5",
      address: "B6iGF9o8RusLc9363ekjPLCgd4W8Be7FSFRMAXq3ytWM",
      type: TreasuryType.Operational,
      category: TreasuryCategory.External,
      department: TreasuryDepartment.Founders,
      holdings: [
        {
          symbol: "VIRGIN",
          amount: 10_000_000,
        },
      ],
    },
  ],
});

export const vestingAccountAtom = atomFamily<VestingAccount | null, string>({
  key: "vesting-account-atom",
  effects: (publicKey) => [effectVestingAccountInformation(publicKey)],
  default: null,
});
