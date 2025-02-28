import { AccountAllocation } from "./AccountAllocation";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/AccountAllocation",
  component: AccountAllocation,
  args: {
    testID: "account-allocation",
  },
} satisfies Meta<typeof AccountAllocation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: "Test name",
    description: "Test description",
    portion: 0.3,
    remainingPortion: 0.2,
    marketCap: 1000000,
  },
} satisfies Story;
