import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Elements/Tags",
  component: Tag,
  argTypes: {},
  args: {
    testID: "tag",
  },
} satisfies Meta<React.ComponentProps<typeof Tag>>;

export default meta;

export const Default = {
  argTypes: {},
  args: {},
} satisfies StoryObj<Meta<React.ComponentProps<typeof Tag>>>;
