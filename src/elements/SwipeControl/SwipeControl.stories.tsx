import { SwipeControl } from "./SwipeControl";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Elements/SwipeControl",
  component: SwipeControl,
  args: {
    testID: "confirmation-slider",
  },
} satisfies Meta<typeof SwipeControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "Are you sure?",
  },
} satisfies Story;
