import { ContractAddress } from "./ContractAddress";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Onboarding/ContractAddress",
  component: ContractAddress,
  parameters: {
    layout: "centered",
  },
  args: {
    testID: "contract-address",
  },
} satisfies Meta<typeof ContractAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: "ContractAddress",
  args: {
    label: "CA",
    mint: "LFVqPrRGnwYdCwFcDzShBxN2GMFmD4AoCMrjxjq4xdz",
  },
} satisfies Story;
