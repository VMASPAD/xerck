import LayoutUIV1 from "@/components/ui/Blocks/UI/LayoutUIV1";
import LayoutUIV2 from "@/components/ui/Blocks/UI/LayoutUIV2";
import { StoryObj } from "@storybook/react";

const meta = {
  title: 'Blocks/UI', 
  parameters: {
    layout: 'fullscreen',
  },
} 

export default meta;
type Story = StoryObj<typeof meta>;

export const BlockLayoutLoginV1: Story = {
    render: () => <LayoutUIV1 />
  };

  export const BlockLayoutLoginV2: Story = {
    render: () => <LayoutUIV2 />
    };