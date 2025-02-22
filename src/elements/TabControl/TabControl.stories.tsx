import { Meta, StoryObj } from "@storybook/react";
import { TabControl } from "./TabControl";
import { ComponentProps } from "react";

const DISPLAY_VARIANTS: ComponentProps<typeof TabControl>["variant"][] = [
  "dot",
  "underline",
];

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
  title: "Elements/Tabs",
  argTypes: {
    name: {
      control: { disable: true },
    },
    options: {
      control: { disable: true },
    },
  },
  args: {
    testID: "tab-controls",
    name: "menu",
    options: OPTIONS,
  },
} satisfies Meta<React.ComponentProps<typeof TabControl>>;

export default meta;

export const Controlled = {
  name: "TabControls",
  argTypes: {
    variant: {
      name: "Display Types",
      options: DISPLAY_VARIANTS,
      defaultValue: DISPLAY_VARIANTS.indexOf("dot") - 1,
      control: {
        type: "select",
      },
    },
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
    dense: true,
    outline: false,
    rounded: true,
    disabled: false,
    value: OPTIONS[0].value,
    onChange: () => null,
  },
  render: (props) => (
    <div style={{ padding: 20 }}>
      <TabControl {...props} />
    </div>
  ),
} satisfies StoryObj<Meta<React.ComponentProps<typeof TabControl>>>;

export const Uncontrolled = {
  name: "TabControls",
  argTypes: {
    variant: {
      name: "Display Types",
      options: DISPLAY_VARIANTS,
      defaultValue: DISPLAY_VARIANTS.indexOf("dot") - 1,
      control: {
        type: "select",
      },
    },
    value: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    name: "menu",
    dense: true,
    outline: false,
    rounded: true,
    disabled: false,
    defaultValue: OPTIONS[0].value,
  },
  render: (props) => (
    <div style={{ padding: 20 }}>
      <TabControl {...props} />
    </div>
  ),
} satisfies StoryObj<Meta<React.ComponentProps<typeof TabControl>>>;

export const Styles = {
  name: "Display Styles",
  argTypes: {
    variant: {
      name: "Display Types",
      options: DISPLAY_VARIANTS,
      defaultValue: DISPLAY_VARIANTS.indexOf("dot") - 1,
      control: {
        type: "select",
      },
    },
  },
  args: {
    dense: true,
    outline: false,
    rounded: false,
    disabled: false,
    defaultValue: OPTIONS[0].value,
  },
  render: (props) => (
    <div
      style={{
        padding: 20,
        display: "grid",
        gridAutoFlow: "row",
        gap: "var(--size-100)",
      }}
    >
      <h1>Simple</h1>
      <TabControl {...props} variant={"dot"} name={"dots"} />
      <TabControl {...props} variant={"underline"} name={"underline"} />
      <h1>Solid</h1>
      <TabControl {...props} name={"default"} />
      <TabControl {...props} name={"rounded"} rounded />
      <h1>Outlined</h1>
      <TabControl {...props} name={"default-outline"} outline />
      <TabControl {...props} name={"rounded-outline"} rounded outline />
    </div>
  ),
} satisfies StoryObj<Meta<React.ComponentProps<typeof TabControl>>>;
