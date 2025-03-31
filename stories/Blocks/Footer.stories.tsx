import LayoutFooterV1 from "@/components/ui/Blocks/Footer/LayoutFooterV1";
import LayoutFooterV2 from "@/components/ui/Blocks/Footer/LayoutFooterV2";
import LayoutFooterV3 from "@/components/ui/Blocks/Footer/LayoutFooterV3";
import LayoutFooterV4 from "@/components/ui/Blocks/Footer/LayoutFooterV4";
import LayoutFooterV5 from "@/components/ui/Blocks/Footer/LayoutFooterV5";
import LayoutFooterV6 from "@/components/ui/Blocks/Footer/LayoutFooterV6";
import LayoutFooterV7 from "@/components/ui/Blocks/Footer/LayoutFooterV7";
import { StoryObj } from "@storybook/react";

const meta = {
  title: 'Blocks/Footer', 
  parameters: {
    layout: 'fullscreen',
  },
};
  
export default meta;
type Story = StoryObj<typeof meta>;

export const FooterV1: Story = {
  render: () => <LayoutFooterV1/>
};

export const FooterV2: Story = {
  render: () => <LayoutFooterV2/>
};

export const FooterV3: Story = {
  render: () => <LayoutFooterV3/>
};

export const FooterV4: Story = {
  render: () => <LayoutFooterV4/>
};

export const FooterV5: Story = {
  render: () => <LayoutFooterV5/>
};

export const FooterV6: Story = {
  render: () => <LayoutFooterV6/>
};

export const FooterV7: Story = {
  render: () => <LayoutFooterV7/>
};