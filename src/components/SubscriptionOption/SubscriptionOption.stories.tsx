import { SubscriptionOption } from "./SubscriptionOption";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cards/SubscriptionOption",
  component: SubscriptionOption,
  parameters: {
    layout: "centered",
  },
  args: {
    testID: "subscription-option",
  },
} satisfies Meta<typeof SubscriptionOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Subscription Title",
    name: "subscription-1",
    benefits: [{ label: "Benefit 1" }, { label: "Benefit 2" }],
    price: { amount: 9.99, currency: "USD" },
    discount: { amount: 4.99, currency: "USD" },
    applied: false,
    highlight: false,
  },
} satisfies Story;
