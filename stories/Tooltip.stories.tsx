import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/Tooltip";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent transition-colors">
        Hover sobre mí
      </TooltipTrigger>
      <TooltipContent>
        Información del tooltip
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Botón con tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        Acciones disponibles
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithSides: Story = {
  render: () => (
    <div className="flex space-x-12 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Arriba</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          Tooltip arriba
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Derecha</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          Tooltip derecha
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Abajo</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Tooltip abajo
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Izquierda</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          Tooltip izquierda
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithAlign: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex space-x-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Inicio</Button>
          </TooltipTrigger>
          <TooltipContent align="start">
            Alineado al inicio
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Centro</Button>
          </TooltipTrigger>
          <TooltipContent align="center">
            Alineado al centro
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Final</Button>
          </TooltipTrigger>
          <TooltipContent align="end">
            Alineado al final
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Tooltip con flecha</Button>
      </TooltipTrigger>
      <TooltipContent showArrow sideOffset={6}>
        Este tooltip tiene una flecha que apunta al trigger
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Tooltip con retraso</Button>
        </TooltipTrigger>
        <TooltipContent>
          Aparece después de 1 segundo
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="mb-2 space-x-2">
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            Mostrar tooltip
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Ocultar tooltip
          </Button>
        </div>
        
        <div className="pt-8">
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
              <Button variant="default">Tooltip controlado</Button>
            </TooltipTrigger>
            <TooltipContent>
              Este tooltip se controla mediante estado
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  },
};

export const WithCustomStyles: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Estilos personalizados</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-blue-500 text-white font-medium" showArrow arrowClassName="bg-blue-500">
        Tooltip con estilos personalizados
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDisabledHoverable: Story = {
  render: () => (
    <TooltipProvider disableHoverableContent>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Sin hover en el contenido</Button>
        </TooltipTrigger>
        <TooltipContent>
          Este tooltip se cierra inmediatamente cuando el cursor sale del trigger,
          incluso si el cursor está sobre el tooltip
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
