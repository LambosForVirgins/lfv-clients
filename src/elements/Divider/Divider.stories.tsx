import { Divider } from "./Divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Elements/Divider",
  component: Divider,
  argTypes: {},
  args: {
    testID: "divider",
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: "Default",
  args: {
    variant: "primary",
    align: "center",
  },
  argTypes: {},
} satisfies Story;

export const Labelled = {
  name: "Labelled",
  args: {
    children: "Ok",
    variant: "primary",
    align: "center",
  },
} satisfies Story;
