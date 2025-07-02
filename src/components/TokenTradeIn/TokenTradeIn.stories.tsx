import { Meta, StoryObj } from "@storybook/react";
import { TokenTradeIn } from "./TokenTradeIn";

const meta = {
  title: "Onboarding/TokenTradeIn",
  component: TokenTradeIn,
  argTypes: {},
  args: {
    testID: "token-trade-in",
  },
} satisfies Meta<React.ComponentProps<typeof TokenTradeIn>>;

export default meta;

export const Controlled = {
  name: "TokenTradeIn",
} satisfies StoryObj<Meta<React.ComponentProps<typeof TokenTradeIn>>>;
