import { Meta, StoryObj } from "@storybook/react";
import { BlockLayout } from "./BlockLayout";
import { Button } from "../Buttons/Button";
import { InlineLayout } from "./InlineLayout";

const meta = {
  title: "Elements/Layouts",
  argTypes: {},
  args: {
    testID: "layout",
  },
} satisfies Meta<React.ComponentProps<typeof BlockLayout>>;

export default meta;

export const Block = {
  name: "BlockLayout",
  argTypes: {},
  args: {},
  render: ({ testID }) => {
    return (
      <BlockLayout testID={testID}>
        <Button testID={`${testID}.button`}>Button</Button>
        <Button testID={`${testID}.button`}>Button</Button>
        <Button testID={`${testID}.button`}>Button</Button>
      </BlockLayout>
    );
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof BlockLayout>>>;

export const Inline = {
  name: "InlineLayout",
  argTypes: {},
  args: {},
  render: ({ testID }) => {
    return (
      <InlineLayout testID={testID}>
        <Button testID={`${testID}.button`}>Button</Button>
        <Button testID={`${testID}.button`}>Button</Button>
        <Button testID={`${testID}.button`}>Button</Button>
      </InlineLayout>
    );
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof InlineLayout>>>;
