import { ConfirmationSlider } from "./ConfirmationSlider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Giveaways/ConfirmationSlider",
  component: ConfirmationSlider,
  args: {
    testID: "confirmation-slider",
  },
} satisfies Meta<typeof ConfirmationSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "Are you sure?",
  },
} satisfies Story;
