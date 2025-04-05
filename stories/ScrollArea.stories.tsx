import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "../components/ui/ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    scrollbarSize: {
      control: { type: "range", min: 5, max: 20, step: 1 },
      description: "El ancho de las barras de desplazamiento",
    },
    hideScrollbarsWhenNotNeeded: {
      control: "boolean",
      description: "Ocultar barras de desplazamiento cuando el contenido no las necesita",
    },
    scrollbarHideDelay: {
      control: { type: "range", min: 0, max: 3000, step: 100 },
      description: "El retraso en milisegundos antes de que las barras de desplazamiento se oculten",
    },
    showVerticalScrollbar: {
      control: "boolean",
      description: "Si se debe mostrar la barra de desplazamiento vertical",
    },
    showHorizontalScrollbar: {
      control: "boolean",
      description: "Si se debe mostrar la barra de desplazamiento horizontal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const VerticalScroll: Story = {
  args: {
    className: "h-72 w-48 rounded-md border",
    scrollbarSize: 10,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Contenido con scroll</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mt-2 text-sm">
            Ítem {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  args: {
    className: "h-40 w-72 rounded-md border",
    scrollbarSize: 10,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="flex h-32 w-32 shrink-0 items-center justify-center rounded-md border mr-2"
          >
            Ítem {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  args: {
    className: "h-72 w-72 rounded-md border",
    scrollbarSize: 10,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4" style={{ width: '500px' }}>
        <h4 className="mb-4 text-sm font-medium leading-none">Contenido con scroll en ambas direcciones</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="mt-2 text-sm">
            Fila {i + 1}: {Array(100).fill('◻').join(' ')}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithImages: Story = {
  args: {
    className: "h-96 w-96 rounded-md border",
    scrollbarSize: 10,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-md border">
            <img
              src={`https://picsum.photos/seed/${i}/200/200`}
              alt={`Imagen ${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LargerScrollbars: Story = {
  args: {
    className: "h-80 w-80 rounded-md border",
    scrollbarSize: 18,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Barras de desplazamiento grandes</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="mt-3 text-sm">
            Contenido con barras de desplazamiento grandes - Línea {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const NoAutoHide: Story = {
  args: {
    className: "h-64 w-64 rounded-md border",
    scrollbarSize: 10,
    hideScrollbarsWhenNotNeeded: false,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Barras de desplazamiento siempre visibles</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="mt-2 text-sm">
            Las barras siempre están visibles - Línea {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalOnly: Story = {
  args: {
    className: "h-40 w-72 rounded-md border",
    scrollbarSize: 10,
    showVerticalScrollbar: false,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex h-32 w-32 shrink-0 items-center justify-center rounded-md border mr-2"
          >
            Solo horizontal {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const VerticalOnly: Story = {
  args: {
    className: "h-72 w-80 rounded-md border",
    scrollbarSize: 10,
    showHorizontalScrollbar: false,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4" style={{ width: '800px' }}>
        <h4 className="mb-4 text-sm font-medium leading-none">Solo barra vertical (contenido horizontal cortado)</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="mt-2 text-sm whitespace-nowrap">
            Este contenido horizontal se cortará - {Array(100).fill('●').join(' ')}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const NestedScrollAreas: Story = {
  args: {
    className: "h-96 w-96 rounded-md border",
    scrollbarSize: 10,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">ScrollArea externa</h4>
        <p className="mb-4">Contenido de la ScrollArea principal</p>
        
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-6">
            <h5 className="mb-2 text-sm font-medium">Sección {i + 1}</h5>
            <ScrollArea className="h-40 w-full rounded-md border">
              <div className="p-4">
                <h6 className="mb-2 text-xs font-medium">ScrollArea interna {i + 1}</h6>
                {Array.from({ length: 20 }).map((_, j) => (
                  <div key={j} className="mt-2 text-xs">
                    Contenido interno {i + 1}.{j + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`bottom-${i}`} className="mt-2">
            Contenido adicional de la ScrollArea principal {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
