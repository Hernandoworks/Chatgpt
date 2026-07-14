import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-400">This is the card content.</p>
      </div>
    ),
  },
};
