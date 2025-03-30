import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger,
  PopoverAnchor
} from "../components/ui/Popover";
import { cn } from "../lib/utils";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
        Abrir Popover
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensiones</h4>
            <p className="text-sm text-muted-foreground">
              Establece las dimensiones para el objeto.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm">
                Ancho
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm">
                Alto
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAlignOptions: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-4">
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Alineación: start
        </PopoverTrigger>
        <PopoverContent align="start" className="w-60">
          <p className="text-sm">
            Este popover está alineado al inicio del trigger.
          </p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Alineación: center
        </PopoverTrigger>
        <PopoverContent align="center" className="w-60">
          <p className="text-sm">
            Este popover está alineado al centro del trigger.
          </p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Alineación: end
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <p className="text-sm">
            Este popover está alineado al final del trigger.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithDifferentSides: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-8 py-20">
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Lado: bottom (default)
        </PopoverTrigger>
        <PopoverContent side="bottom" showArrow className="w-60">
          <p className="text-sm">
            Este popover aparece debajo del trigger.
          </p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Lado: top
        </PopoverTrigger>
        <PopoverContent side="top" showArrow className="w-60">
          <p className="text-sm">
            Este popover aparece encima del trigger.
          </p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Lado: left
        </PopoverTrigger>
        <PopoverContent side="left" showArrow className="w-60">
          <p className="text-sm">
            Este popover aparece a la izquierda del trigger.
          </p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Lado: right
        </PopoverTrigger>
        <PopoverContent side="right" showArrow className="w-60">
          <p className="text-sm">
            Este popover aparece a la derecha del trigger.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithDifferentOffsets: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-4">
      <Popover>
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Offset: 4px (default)
        </PopoverTrigger>
        <PopoverContent sideOffset={4} className="w-60">
          <p className="text-sm">
            Este popover tiene un offset de 4px (valor por defecto).
          </p>
        </PopoverContent> 
       
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Offset: 15px
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="w-60">
          <p className="text-sm">
            Este popover tiene un offset de 15px.
          </p>
        </PopoverContent> 
       
        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Offset: 30px
        </PopoverTrigger>
        <PopoverContent sideOffset={30} className="w-60">
          <p className="text-sm">
            Este popover tiene un offset de 30px.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
        Popover con flecha
      </PopoverTrigger>
      <PopoverContent showArrow>
        <p className="text-sm">
          Este popover muestra una flecha que apunta hacia el trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          i
        </button>
      </PopoverTrigger>
      <PopoverContent showArrow className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Información importante</h4>
          <p className="text-sm text-muted-foreground">
            Esta información es esencial para entender cómo funciona este componente.
            El botón de trigger es personalizado usando "asChild".
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ControlledExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="pb-4 space-x-2">
          <button 
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
          >
            Abrir Popover
          </button>
          <button 
            onClick={() => setOpen(false)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md"
          >
            Cerrar Popover
          </button>
        </div>
        
        <Popover open={open} onOpenChange={setOpen}> 
          <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
            Popover Controlado
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm">
              Este es un popover controlado, se abre y cierra con botones externos.
            </p>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setOpen(false)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 py-1 rounded-md text-sm"
              >
                Cerrar
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
