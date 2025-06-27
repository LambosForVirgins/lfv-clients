import { Divider } from "./Divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Elements/Divider",
  component: Divider,
  args: {
    testID: "divider",
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    variant: "primary",
    align: "center",
  },
  argTypes: {
    label: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Story;

export const Labelled = {
  args: {
    label: "Ok",
    variant: "primary",
    align: "center",
  },
} satisfies Story;
