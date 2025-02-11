import { DailyEntrySlider } from "./DailyEntrySlider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Giveaways/DailyEntrySlider",
  component: DailyEntrySlider,
  args: {
    testID: "daily-entry-slider",
  },
} satisfies Meta<typeof DailyEntrySlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
