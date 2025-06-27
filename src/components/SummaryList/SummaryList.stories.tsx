import { SummaryList } from "./SummaryList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cards/SummaryList",
  component: SummaryList,
  parameters: {
    layout: "centered",
  },
  args: {
    testID: "summary-list",
  },
} satisfies Meta<typeof SummaryList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Included with GigaChad",
    pricing: [{ currency: "USD", amount: 100 }],
    selected: false,
    items: [
      { label: "Unlimited Likes" },
      { label: "Unlimited Rewinds" },
      {
        label: "Unlimited Passport Mode",
        description: "Match and chat with people anywhere in the world.",
      },
      {
        label: "Control Your Profile",
        description: "Only show what you want them to know.",
      },
      {
        label: "Control Who Sees You",
        description: "Manage who you're seen by.",
      },
      {
        label: "Control Who You See",
        description: "Choose the type of people you want to connect with.",
      },
      { label: "Hide Ads" },
    ],
  },
} satisfies Story;
