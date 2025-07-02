import { Meta, StoryObj } from "@storybook/react";
import { LaunchSale } from "./LaunchSale";

const meta = {
  title: "Onboarding/LaunchSale",
  component: LaunchSale,
  argTypes: {},
  args: {
    testID: "launch-sale",
  },
} satisfies Meta<React.ComponentProps<typeof LaunchSale>>;

export default meta;

export const Controlled = {
  name: "LaunchSale",
} satisfies StoryObj<Meta<React.ComponentProps<typeof LaunchSale>>>;
