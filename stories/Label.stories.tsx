import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import Checkbox from "../components/ui/Checkbox";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: "boolean",
      description: "Renderiza un elemento hijo en lugar de un <label>",
      defaultValue: false,
    },
    htmlFor: {
      control: "text",
      description: "ID del elemento de formulario asociado",
    },
    className: {
      control: "text",
      description: "Clases adicionales para personalizar el label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Etiqueta por defecto",
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-input">Correo electrónico</Label>
      <Input
        id="email-input"
        type="email"
        placeholder="ejemplo@correo.com"
      />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Acepto los términos y condiciones</Label>
    </div>
  ),
};

export const Required: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-input" className="after:content-['*'] after:ml-0.5 after:text-red-500">
        Campo requerido
      </Label>
      <Input
        id="required-input"
        required
        placeholder="Este campo es obligatorio"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-70 cursor-not-allowed">
        Campo deshabilitado
      </Label>
      <Input
        id="disabled-input"
        disabled
        placeholder="Este campo está deshabilitado"
      />
    </div>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="description-input">Nombre de usuario</Label>
      <Input
        id="description-input"
        placeholder="@usuario"
      />
      <p className="text-xs text-muted-foreground">
        Este será tu nombre de usuario público.
      </p>
    </div>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <form className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Nombre completo" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" type="email" placeholder="ejemplo@correo.com" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="text-sm text-muted-foreground">
          Deseo recibir actualizaciones por correo electrónico
        </Label>
      </div>
    </form>
  ),
};
