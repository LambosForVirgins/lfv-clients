import { ContractAddress } from "./ContractAddress";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Buttons/ContractAddress",
  component: ContractAddress,
  args: {
    testID: "contract-address",
  },
} satisfies Meta<typeof ContractAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "CA",
    mint: "LFVqPrRGnwYdCwFcDzShBxN2GMFmD4AoCMrjxjq4xdz",
  },
} satisfies Story;
