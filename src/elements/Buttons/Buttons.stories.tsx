import { Meta, StoryObj } from "@storybook/react";
import { PixelButton } from "./PixelButton";

const OPTIONS = [
  {
    label: "One",
    value: "one",
  },
  { label: "Disabled", value: "two", disabled: true },
  { label: "Large Label Option", value: "three" },
  { label: "Last Option", value: "four" },
];

const meta = {
  title: "Elements/Buttons",
  component: PixelButton,
  argTypes: {
    name: {
      control: { disable: true },
    },
  },
  args: {
    testID: "button",
    name: "menu",
    children: "Click Me",
  },
} satisfies Meta<React.ComponentProps<typeof PixelButton>>;

export default meta;

export const Controlled = {
  name: "PixelButtons",
  argTypes: {
    value: {
      name: "Selected option",
      options: OPTIONS.map((option) => option.value),
      defaultValue: OPTIONS[0].value,
      control: {
        type: "select",
      },
    },
  },
  args: {
    name: "menu",
    onChange: () => null,
  },
} satisfies StoryObj<Meta<React.ComponentProps<typeof PixelButton>>>;
