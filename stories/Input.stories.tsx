import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/ui/Input";
import { Mail, Search, User, Eye, EyeOff } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      description: "Tipo de input",
      defaultValue: "text",
    },
    disabled: {
      control: "boolean",
      description: "Estado deshabilitado del input",
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    className: {
      control: "text",
      description: "Clases adicionales para el input",
    },
    wrapperClassName: {
      control: "text",
      description: "Clases adicionales para el contenedor (cuando se usa con prefix/suffix)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Escribe aquí...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input deshabilitado",
    disabled: true,
  },
};

export const WithPrefixIcon: Story = {
  render: (args) => (
    <div className="w-72">
      <Input
        {...args}
        prefix={<Mail className="h-4 w-4 text-muted-foreground" />}
        type="email"
      />
    </div>
  ),
  args: {
    placeholder: "ejemplo@email.com",
  },
};

export const WithSuffixIcon: Story = {
  render: (args) => (
    <div className="w-72">
      <Input
        {...args}
        suffix={<Search className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  ),
  args: {
    placeholder: "Buscar...",
  },
};

export const WithPrefixAndSuffix: Story = {
  render: (args) => (
    <div className="w-72">
      <Input
        {...args}
        prefix={<User className="h-4 w-4 text-muted-foreground" />}
        suffix={<span className="text-xs text-muted-foreground">usuario</span>}
      />
    </div>
  ),
  args: {
    placeholder: "Nombre de usuario",
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="w-72">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Introduce tu contraseña"
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
};

export const SearchInput: Story = {
  render: (args) => (
    <div className="w-72">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          alert("Búsqueda enviada");
        }}
      >
        <Input
          {...args}
          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
          type="search"
        />
      </form>
    </div>
  ),
  args: {
    placeholder: "Buscar artículos...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input placeholder="Input pequeño" className="h-8 text-xs" />
      <Input placeholder="Input normal" />
      <Input placeholder="Input grande" className="h-10 text-base" />
    </div>
  ),
};
