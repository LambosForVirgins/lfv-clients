import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { BlockLayout } from "../Layouts";

const meta = {
  title: "Elements/Buttons",
  component: Button,
  argTypes: {},
  args: {
    testID: "button",
  },
} satisfies Meta<React.ComponentProps<typeof Button>>;

export default meta;

export const Variants = {
  argTypes: {},
  args: {
    children: "Click Me",
  },
  render: (args) => (
    <BlockLayout testID="buttons">
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="muted" />
      <Button {...args} variant="danger" />
      <Button {...args} variant="success" />
    </BlockLayout>
  ),
} satisfies StoryObj<Meta<React.ComponentProps<typeof Button>>>;

export const Sizes = {
  argTypes: {},
  args: {
    children: "Click Me",
  },
  render: (args) => (
    <BlockLayout testID="buttons">
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </BlockLayout>
  ),
} satisfies StoryObj<Meta<React.ComponentProps<typeof Button>>>;
