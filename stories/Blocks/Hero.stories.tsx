import LayoutHeroV1 from "@/components/ui/Blocks/Hero/LayoutHeroV1";
import LayoutHeroV2 from "@/components/ui/Blocks/Hero/LayoutHeroV2";
import LayoutHeroV3 from "@/components/ui/Blocks/Hero/LayoutHeroV3";
import LayoutHeroV4 from "@/components/ui/Blocks/Hero/LayoutHeroV4";
import LayoutHeroV5 from "@/components/ui/Blocks/Hero/LayoutHeroV5";
import LayoutHeroV6 from "@/components/ui/Blocks/Hero/LayoutHeroV6";
import LayoutHeroV7 from "@/components/ui/Blocks/Hero/LayoutHeroV7";
import { StoryObj } from "@storybook/react";

const meta = {
    title: 'Blocks/Hero', 
    parameters: {
      layout: 'fullscreen',
    },
  } 
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const HeroV1: Story = {
    render: () => <LayoutHeroV1 />
  };

  export const HeroV2: Story = {
    render: () => <LayoutHeroV2 />
  };

  export const HeroV3: Story = {
    render: () => <LayoutHeroV3 />
  };

  export const HeroV4: Story = {
    render: () => <LayoutHeroV4 />
  };

  export const HeroV5: Story = {
    render: () => <LayoutHeroV5 />
  };

  export const HeroV6: Story = {
    render: () => <LayoutHeroV6 />
  };

  export const HeroV7: Story = {
    render: () => <LayoutHeroV7 />
  };