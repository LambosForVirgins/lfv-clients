import { SlotMachine } from "./SlotMachine";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Giveaways/SlotMachine",
  component: SlotMachine,
  args: {
    testID: "slot-machine",
  },
} satisfies Meta<typeof SlotMachine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    value: 0,
    max: 1234,
  },
} satisfies Story;
