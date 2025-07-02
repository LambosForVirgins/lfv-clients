import { Meta, StoryObj } from "@storybook/react";
import { CommandPrompt } from "./CommandPrompt";
import { steps } from "./steps";

const meta = {
  title: "Onboarding/CommandPrompt",
  component: CommandPrompt,
  argTypes: {
    steps: {
      control: { disable: true },
    },
    onDismiss: {
      control: { disable: true },
    },
  },
  args: {
    testID: "command-prompt",
    steps,
    onDismiss: () => null,
  },
} satisfies Meta<React.ComponentProps<typeof CommandPrompt>>;

export default meta;

export const Controlled = {
  name: "CommandPrompt",
} satisfies StoryObj<Meta<React.ComponentProps<typeof CommandPrompt>>>;
