import LayoutNavBarV1 from "@/components/ui/Blocks/NavBar/LayoutNavBarV1";
import LayoutNavBarV2 from "@/components/ui/Blocks/NavBar/LayoutNavBarV2";
import LayoutNavBarV3 from "@/components/ui/Blocks/NavBar/LayoutNavBarV3";
import LayoutNavBarV4 from "@/components/ui/Blocks/NavBar/LayoutNavBarV4";
import LayoutNavBarV5 from "@/components/ui/Blocks/NavBar/LayoutNavBarV5";
import LayoutNavBarV6 from "@/components/ui/Blocks/NavBar/LayoutNavBarV6";
import LayoutNavBarV7 from "@/components/ui/Blocks/NavBar/LayoutNavBarV7";
import { StoryObj } from "@storybook/react";

const meta = {
    title: 'Blocks/NavBar', 
    parameters: {
      layout: 'fullscreen',
    },
  } 
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const NavBarV1: Story = {
    render: () => <LayoutNavBarV1 />
  };

  export const NavBarV2: Story = {
    render: () => <LayoutNavBarV2 />
  };

  export const NavBarV3: Story = {
    render: () => <LayoutNavBarV3 />
  };

  export const NavBarV4: Story = {
    render: () => <LayoutNavBarV4 />
  };

  export const NavBarV5: Story = {
    render: () => <LayoutNavBarV5 />
  };

  export const NavBarV6: Story = {
    render: () => <LayoutNavBarV6 />
  };

  export const NavBarV7: Story = {
    render: () => <LayoutNavBarV7 />
  };