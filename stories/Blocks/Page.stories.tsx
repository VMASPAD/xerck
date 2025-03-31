import type { StoryObj } from '@storybook/react'; 
import React from 'react';
import LayotLoginV1 from '@/components/ui/Blocks/Login/LayotLoginV1';
import LayotLoginV2 from '@/components/ui/Blocks/Login/LayotLoginV2';
import LayotLoginV3 from '@/components/ui/Blocks/Login/LayotLoginV3';
import LayotLoginV4 from '@/components/ui/Blocks/Login/LayotLoginV4';
import LayotLoginV5 from '@/components/ui/Blocks/Login/LayotLoginV5';
import LayotLoginV6 from '@/components/ui/Blocks/Login/LayotLoginV6';
import LayotLoginV7 from '@/components/ui/Blocks/Login/LayotLoginV7';

// Eliminamos importaciones no utilizadas para reducir posibles conflictos

const meta = {
  title: 'Blocks/Login', 
  parameters: {
    layout: 'fullscreen',
  },
} 

export default meta;
type Story = StoryObj<typeof meta>;

export const BlockLayoutLoginV1: Story = {
  render: () => <LayotLoginV1 />
};

export const BlockLayoutLoginV2: Story = {
  render: () => <LayotLoginV2 />
};

export const BlockLayoutLoginV3: Story = {
  render: () => <LayotLoginV3 />
};

export const BlockLayoutLoginV4: Story = {
  render: () => <LayotLoginV4 />
};

export const BlockLayoutLoginV5: Story = {
  render: () => <LayotLoginV5 />
};

export const BlockLayoutLoginV6: Story = {
  render: () => <LayotLoginV6 />
};

export const BlockLayoutLoginV7: Story = {
  render: () => <LayotLoginV7 />
};