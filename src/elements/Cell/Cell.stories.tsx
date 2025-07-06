import { Meta, StoryObj } from "@storybook/react";
import { Cell } from "./Cell";

const meta = {
  title: "Elements/Cells",
  component: Cell,
  argTypes: {},
  args: {
    testID: "Cell",
  },
} satisfies Meta<React.ComponentProps<typeof Cell>>;

export default meta;

export const Default = {
  argTypes: {},
  args: {
    children: "Click Me",
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof Cell>>>;
