import { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../components/ui/Checkbox";
import React from "react";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
      layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
      checked: {
        control: "boolean",
        description: "Estado de selección del checkbox (modo controlado)",
      },
      disabled: {
        control: "boolean",
        description: "Estado deshabilitado del checkbox",
      },
      defaultChecked: {
        control: "boolean",
        description: "Valor de selección inicial (modo no controlado)",
      },
      onChange: {
        action: "changed",
        description: "Callback cuando cambia el estado",
      },
      className: {
        control: "text",
        description: "Clases adicionales para el checkbox",
      },
    },
  }
  
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

// Añadir ejemplo con label
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="terms-checkbox" />
      <label htmlFor="terms-checkbox" className="cursor-pointer">
        Acepto los términos y condiciones
      </label>
    </div>
  ),
  args: {
    defaultChecked: false,
  },
};

// Añadir ejemplo controlado con estado
export const WithControlledState: Story = {
  render: () => {
    // Este ejemplo muestra cómo usar el checkbox en modo controlado
    const [isChecked, setIsChecked] = useState(false);
    
    return (
      <div className="flex flex-col gap-4">
        <Checkbox 
          checked={isChecked} 
          onChange={(e) => setIsChecked(e.target.checked)} 
          id="controlled-checkbox"
        />
        <div>Estado actual: {isChecked ? "Marcado" : "No marcado"}</div>
        <Button
          onClick={() => setIsChecked(!isChecked)} 
        >
          Cambiar estado
        </Button>
      </div>
    );
  }
};