import { Meta, StoryObj } from "@storybook/react";
import { Completion } from "./Completion";

const meta = {
  title: "Elements/Completion",
  component: Completion,
  args: {
    testID: "completion",
  },
} satisfies Meta<React.ComponentProps<typeof Completion>>;

export default meta;

export const Default = {
  args: {
    value: 85,
    total: 100,
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof Completion>>>;
