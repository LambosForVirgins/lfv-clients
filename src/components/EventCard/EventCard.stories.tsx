import { EventCard } from "./EventCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cards/EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
  },
  args: {
    testID: "event-card",
  },
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Event Title",
    dateTime: new Date(),
    pricing: [{ currency: "USD", amount: 100 }],
    media: [
      { id: "1", src: "https://via.placeholder.com/150", alt: "Event Image" },
    ],
    location: { id: "1", city: "New York", country: "USA" },
  },
} satisfies Story;
