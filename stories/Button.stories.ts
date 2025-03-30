import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['normal', 'secondary', 'outline', 'danger', 'success', 'info', 'warning', 'ghost', 'link', 'subtle', 'gradient']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    style: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Original variants
export const Normal: Story = {
  args: {
    label: 'Button',
    variant: 'normal'
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary'
  },
};

export const Outline: Story = {
  args: { 
    label: 'Button',
    variant: 'outline'
  },
};

export const Danger: Story = {
  args: { 
    label: 'Button',
    variant: 'danger'
  },
};

// New variants
export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success'
  },
};

export const Info: Story = {
  args: {
    label: 'Info',
    variant: 'info'
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning'
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    variant: 'ghost'
  },
};

export const Link: Story = {
  args: {
    label: 'Link Button',
    variant: 'link'
  },
};

export const Subtle: Story = {
  args: {
    label: 'Subtle',
    variant: 'subtle'
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'sm'
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    size: 'md'
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'lg'
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true
  },
};

// Custom style example
export const CustomStyle: Story = {
  args: {
    label: 'Custom Button',
    style: "bg-purple-600 text-white hover:bg-purple-700 text-sm transform-gpu transition-all duration-300 ease-out"
  },
};
