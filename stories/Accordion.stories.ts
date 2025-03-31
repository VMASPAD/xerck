import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  TestAccordion,
} from "../components/ui/Accordion";

const meta = {
  title: "Components/Accordion",
  component: TestAccordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description:
        "Tipo de acordeón: simple (solo un elemento abierto) o múltiple",
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "ghost"],
      description: "Estilo visual del acordeón",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple Accordion (single open item)
export const SingleAccordion: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
    variant: "default",
  },
  
};

// Multiple Accordion (multiple open items)
export const MultipleAccordion: Story = {
  args: {
    type: "multiple",
    defaultValues: ["item-1"],
    variant: "bordered",
  },
};

// Ghost Variant
export const GhostAccordion: Story = {
  args: {
    type: "single",
    defaultValue: "item-2",
    variant: "ghost",
  },
};

// Disabled Item
export const WithDisabledItem: Story = {
  args: {
    type: "single",
    variant: "bordered",
  },
};
export const WithFilledItem: Story = {
    args: {
      type: "single",
      variant: "filled",
    },
  };

  export const WithCompactItem: Story = {
    args: {
      type: "single",
      variant: "elevated",
    },
  };
  export const WithCardItem: Story = {
    args: {
      type: "single",
      variant: "card",
    },
  };
  export const WithColorfulItem: Story = {
    args: {
      type: "single",
      variant: "colorful",
    },
  };
  export const WithElevatedItem: Story = {
    args: {
      type: "single",
      variant: "elevated",
    },
  };