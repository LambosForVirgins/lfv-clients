import { DrawMachine } from "./DrawMachine";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Giveaways/DrawMachine",
  component: DrawMachine,
  args: {
    testID: "DrawMachine",
  },
} satisfies Meta<typeof DrawMachine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    drawId: "test-draw-id",
  },
} satisfies Story;
