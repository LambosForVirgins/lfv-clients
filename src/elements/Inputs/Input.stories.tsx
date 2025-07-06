import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Elements/Inputs",
  component: Input,
  argTypes: {},
  args: {
    testID: "input",
  },
} satisfies Meta<React.ComponentProps<typeof Input>>;

export default meta;

export const Default = {
  name: "Input",
  argTypes: {},
  args: {
    rounded: true,
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof Input>>>;
