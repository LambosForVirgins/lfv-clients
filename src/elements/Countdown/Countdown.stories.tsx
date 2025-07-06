import { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "./Countdown";

const meta = {
  title: "Elements/Countdown",
  component: Countdown,
  argTypes: {},
  args: {
    testID: "countdown",
  },
} satisfies Meta<React.ComponentProps<typeof Countdown>>;

export default meta;

export const Default = {
  argTypes: {},
  args: {
    timeRemaining: 10,
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof Countdown>>>;
