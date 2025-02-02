import { atom, atomFamily } from "recoil";
import { effectVestingAccountInformation } from "./effects";
import { VestingAccount } from "./types";

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

export const tokenAllocationAtom = atom({
  key: "token-allocation-atom",
  default: [
    {
      name: "Giveaway Fund",
      portion: 0.1,
    },
    {
      name: "Marketing Fund",
      portion: 0.1,
    },
    {
      name: "Team Fund",
      portion: 0.11,
    },
  ],
});

export const vestingAccountAtom = atomFamily<VestingAccount | null, string>({
  key: "vesting-account-atom",
  effects: (publicKey) => [effectVestingAccountInformation(publicKey)],
  default: null,
});
