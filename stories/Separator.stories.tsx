import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../components/ui/Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
      description: "Orientación del separador",
    },
    decorative: {
      control: "boolean",
      description: "Si el separador es puramente decorativo (sin significado semántico)",
    },
    thickness: {
      control: "text",
      description: "Grosor del separador (cualquier valor CSS válido)",
    },
    spacing: {
      control: "text",
      description: "Espacio antes y después del separador (cualquier valor CSS válido)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    className: "w-[300px]",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-[150px]",
  },
  render: (args) => (
    <div className="flex h-[150px] items-center">
      <div>
        <p className="text-sm text-muted-foreground">Contenido izquierdo</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="text-sm text-muted-foreground">Contenido derecho</p>
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <div>
        <h4 className="text-lg font-medium">Configuración</h4>
        <p className="text-sm text-muted-foreground">
          Administra tus preferencias y ajustes de cuenta.
        </p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <div>
          <h5 className="text-sm font-medium mb-1">Perfil</h5>
          <p className="text-xs text-muted-foreground">
            Gestiona tu información personal
          </p>
        </div>
        <button className="text-sm text-primary">Editar</button>
      </div>
      <Separator />
      <div className="flex justify-between">
        <div>
          <h5 className="text-sm font-medium mb-1">Seguridad</h5>
          <p className="text-xs text-muted-foreground">
            Actualiza tu contraseña y configuración de seguridad
          </p>
        </div>
        <button className="text-sm text-primary">Editar</button>
      </div>
      <Separator />
      <div className="flex justify-between">
        <div>
          <h5 className="text-sm font-medium mb-1">Notificaciones</h5>
          <p className="text-xs text-muted-foreground">
            Configura cómo y cuándo recibes notificaciones
          </p>
        </div>
        <button className="text-sm text-primary">Editar</button>
      </div>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <h4 className="mb-2">Separador predeterminado</h4>
        <Separator />
      </div>
      
      <div>
        <h4 className="mb-2">Separador más grueso</h4>
        <Separator thickness="3px" />
      </div>
      
      <div>
        <h4 className="mb-2">Separador con color personalizado</h4>
        <Separator className="bg-primary" />
      </div>
      
      <div>
        <h4 className="mb-2">Separador con espaciado reducido</h4>
        <Separator spacing="0.5rem" />
      </div>
      
      <div>
        <h4 className="mb-2">Separador con gradiente</h4>
        <Separator className="bg-gradient-to-r from-primary to-transparent" thickness="2px" />
      </div>
      
      <div>
        <h4 className="mb-2">Separador con sombra</h4>
        <div className="relative">
          <Separator className="shadow-sm" />
        </div>
      </div>
    </div>
  ),
};

export const WithVerticalLayout: Story = {
  render: () => (
    <div className="flex h-[200px] max-w-[600px]">
      <div className="w-[200px] p-4">
        <h4 className="mb-2 text-sm font-medium">Navegación</h4>
        <ul className="space-y-2">
          <li className="text-primary">Inicio</li>
          <li>Productos</li>
          <li>Servicios</li>
          <li>Contacto</li>
        </ul>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 p-4">
        <h4 className="mb-2 text-sm font-medium">Contenido principal</h4>
        <p className="text-sm text-muted-foreground">
          Esta es el área de contenido principal. El separador vertical crea una 
          distinción visual entre la navegación y el contenido.
        </p>
      </div>
    </div>
  ),
};

export const DecorationVariations: Story = {
  render: () => (
    <div className="w-[500px] space-y-8">
      <div>
        <h4 className="mb-2 text-sm font-medium">Separador sólido (predeterminado)</h4>
        <Separator />
      </div>
      
      <div>
        <h4 className="mb-2 text-sm font-medium">Separador punteado</h4>
        <Separator className="border-t border-dashed border-border bg-transparent h-0" />
      </div>
      
      <div>
        <h4 className="mb-2 text-sm font-medium">Separador discontinuo</h4>
        <Separator className="border-t border-dotted border-border bg-transparent h-0" />
      </div>
      
      <div>
        <h4 className="mb-2 text-sm font-medium">Separador doble</h4>
        <div className="space-y-1">
          <Separator thickness="1px" spacing="0" />
          <Separator thickness="1px" spacing="0" />
        </div>
      </div>
      
      <div>
        <h4 className="mb-2 text-sm font-medium">Separador con texto</h4>
        <div className="relative flex items-center">
          <Separator className="flex-grow" />
          <span className="mx-2 text-xs text-muted-foreground bg-background px-2">
            Sección nueva
          </span>
          <Separator className="flex-grow" />
        </div>
      </div>
    </div>
  ),
};
