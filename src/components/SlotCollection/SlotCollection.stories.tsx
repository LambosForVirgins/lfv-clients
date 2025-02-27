import { SlotCollection } from "./SlotCollection";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/SlotCollection",
  component: SlotCollection,
  args: {
    testID: "slot-collection",
  },
} satisfies Meta<typeof SlotCollection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    slots: [
      {
        type: "streak",
        media: {
          img: "",
        },
        label: 2,
      },
      {
        type: "streak",
        media: {
          img: "",
        },
        label: 5,
      },
      {
        type: "streak",
        media: {
          img: "",
        },
      },
      {
        type: "streak",
        media: {
          img: "",
        },
        label: 1234,
      },
      {
        type: "streak",
        label: 1,
      },
    ],
  },
} satisfies Story;
