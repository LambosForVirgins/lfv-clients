import { PlanCard } from "./PlanCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cards/PlanCard",
  component: PlanCard,
  // parameters: {
  //   layout: "centered",
  // },
  args: {
    testID: "plan-card",
  },
} satisfies Meta<typeof PlanCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "1 Week",
    pricing: [{ currency: "USD", amount: 100 }],
    selected: false,
  },
} satisfies Story;

export const Tagged = {
  args: {
    tag: "Popular",
    title: "1 Week",
    pricing: [{ currency: "USD", amount: 100 }],
    selected: false,
  },
} satisfies Story;

export const Selected = {
  args: {
    tag: "Popular",
    title: "1 Week",
    pricing: [{ currency: "USD", amount: 100 }],
    selected: true,
  },
} satisfies Story;

export const Collection = {
  args: {
    tag: "Popular",
    title: "1 Week",
    pricing: [{ currency: "USD", amount: 9.99 }],
    selected: true,
  },
  render: (props) => (
    <div>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "240px",
          gap: "1rem",
          overflowX: "scroll",
          scrollSnapAlign: "start",
          scrollSnapType: "inline",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <PlanCard
            key={index}
            {...props}
            tag={index === 0 ? "Popular" : undefined}
            title={`${index + 1} Week`}
            pricing={[
              {
                ...props.pricing[0],
                amount: props.pricing[0].amount * (0.73 * index + 1),
              },
            ]}
            selected={index === 1}
          />
        ))}
      </div>
      <div>Dot indicators</div>
    </div>
  ),
} satisfies Story;
