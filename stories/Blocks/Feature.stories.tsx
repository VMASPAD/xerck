import LayoutFeatureV1 from "@/components/ui/Blocks/Feature/LayoutFeatureV1";
import LayoutFeatureV2 from "@/components/ui/Blocks/Feature/LayoutFeatureV2";
import LayoutFeatureV3 from "@/components/ui/Blocks/Feature/LayoutFeatureV3";
import LayoutFeatureV4 from "@/components/ui/Blocks/Feature/LayoutFeatureV4";
import LayoutFeatureV5 from "@/components/ui/Blocks/Feature/LayoutFeatureV5";
import LayoutFeatureV6 from "@/components/ui/Blocks/Feature/LayoutFeatureV6";
import LayoutFeatureV7 from "@/components/ui/Blocks/Feature/LayoutFeatureV7";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Blocks/Feature', 
    parameters: {
      layout: 'fullscreen',
    },
  };
    
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const FeatureV1: Story = {
    render: () => <LayoutFeatureV1 />
  };

  export const FeatureV2: Story = {
    render: () => <LayoutFeatureV2 />
  };

  export const FeatureV3: Story = {
    render: () => <LayoutFeatureV3 />
  };

  export const FeatureV4: Story = {
    render: () => <LayoutFeatureV4 />
  };

  export const FeatureV5: Story = {
    render: () => <LayoutFeatureV5 />
  };

  export const FeatureV6: Story = {
    render: () => <LayoutFeatureV6 />
  };

  export const FeatureV7: Story = {
    render: () => <LayoutFeatureV7 />
  };