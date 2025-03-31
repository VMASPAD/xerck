import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/HoverCard";
import { CalendarDays } from "lucide-react";
import { Button } from "../components/ui/button";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    openDelay: {
      control: { type: "number" },
      description: "Retraso en milisegundos antes de abrir la tarjeta",
      defaultValue: 700,
    },
    closeDelay: {
      control: { type: "number" },
      description: "Retraso en milisegundos antes de cerrar la tarjeta",
      defaultValue: 300,
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial de apertura",
    },
    open: {
      control: "boolean",
      description: "Estado controlado de apertura",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback cuando cambia el estado de apertura",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger>
        <Button variant="outline">Pasa el ratón por encima</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Información al pasar el ratón</h4>
          <p className="text-sm">Esta tarjeta aparece cuando pasas el ratón por encima del botón.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  args: {
    openDelay: 500,
    closeDelay: 300,
  },
};

export const UserProfile: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <a 
          href="#"
          className="font-medium text-primary underline decoration-primary underline-offset-4"
          onClick={(e) => e.preventDefault()}
        >
          @usuario
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">@usuario</h4>
            <p className="text-sm">
              La interfaz es excelente, intuitiva y fácil de usar. Estoy impresionado por la atención al detalle.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Se unió en Diciembre 2023
              </span>
            </div>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  args: {
    openDelay: 500,
    closeDelay: 300,
  },
};

export const Positioning: Story = {
  render: (args) => (
    <div className="flex h-[300px] w-[500px] items-center justify-center gap-20">
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Button variant="outline">Arriba</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="text-sm">Esta tarjeta aparece arriba del trigger</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Button variant="outline">Izquierda</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <p className="text-sm">Esta tarjeta aparece a la izquierda del trigger</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Button variant="outline">Derecha</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <p className="text-sm">Esta tarjeta aparece a la derecha del trigger</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <HoverCard open={open} onOpenChange={setOpen}>
          <HoverCardTrigger>
            <Button variant="outline">Modo controlado</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold">Tarjeta controlada</h4>
              <p className="text-sm">El estado se controla desde React.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            Abrir
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Cerrar
          </Button>
        </div>
      </div>
    );
  },
};
