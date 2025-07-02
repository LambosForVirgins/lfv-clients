import { type StepFunction } from "./types";

const welcomeStep: StepFunction = () => ({
  key: "step-1",
  lines: [
    " __       ________ __     __ ",
    "|  \\     |        \\  \\   |  \\",
    "| ▓▓     | ▓▓▓▓▓▓▓▓ ▓▓   | ▓▓",
    "| ▓▓     | ▓▓__   | ▓▓   | ▓▓",
    "| ▓▓     | ▓▓  \\   \\▓▓\\ /  ▓▓",
    "| ▓▓     | ▓▓▓▓▓    \\▓▓\\  ▓▓ ",
    "| ▓▓_____| ▓▓        \\▓▓ ▓▓  ",
    "| ▓▓     \\ ▓▓         \\▓▓▓   ",
    " \\▓▓▓▓▓▓▓▓\\▓▓          \\▓    ",
  ],
});

const connectionStep: StepFunction = () => ({
  key: "step-2",
  lines: ["Establishing connection..."],
});

const selectWalletStep: StepFunction = () => {
  let value = "Phantom";

  return {
    key: "selectWallet",
    lines: ["Please select a wallet below."],
    selected: value,
    options: [
      { adapter: { name: "Phantom" }, readyState: "Connected" },
      { adapter: { name: "MetaMask" }, readyState: "Connected" },
    ].map(({ adapter, readyState }) => ({
      key: adapter.name,
      label: adapter.name,
      value: adapter.name,
      disabled: readyState === "NotDetected",
      onSelect: () => {
        value = adapter.name;
      },
    })),
    delay: 2000,
  };
};

export const steps: StepFunction[] = [
  welcomeStep,
  connectionStep,
  selectWalletStep,
];
