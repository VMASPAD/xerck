import type { Meta, StoryObj } from '@storybook/react';
import { ButtonsShowcase } from './ButtonsShowcase';

const meta = {
  title: 'UI/ButtonsShowcase',
  component: ButtonsShowcase,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ButtonsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {};
