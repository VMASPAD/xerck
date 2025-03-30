import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../components/ui/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pulse: {
      control: "boolean",
      description: "Animación de pulso que se aplica al esqueleto",
      defaultValue: true,
    },
    shimmer: {
      control: "boolean",
      description: "Animación de brillo que se aplica al esqueleto",
      defaultValue: false,
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Radio de borde del esqueleto",
      defaultValue: "md",
    },
    className: {
      control: "text",
      description: "Clases CSS adicionales para aplicar al esqueleto",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "w-[100px] h-[20px]",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Por defecto (Solo Pulse)</h3>
        <Skeleton className="h-4 w-[250px]" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Solo Shimmer</h3>
        <Skeleton pulse={false} shimmer className="h-4 w-[250px]" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Pulse y Shimmer</h3>
        <Skeleton pulse shimmer className="h-4 w-[250px]" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Sin animación</h3>
        <Skeleton pulse={false} className="h-4 w-[250px]" />
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded None</h3>
        <Skeleton radius="none" className="h-12 w-12" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded Small</h3>
        <Skeleton radius="sm" className="h-12 w-12" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded Medium (default)</h3>
        <Skeleton radius="md" className="h-12 w-12" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded Large</h3>
        <Skeleton radius="lg" className="h-12 w-12" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded Full (Circle)</h3>
        <Skeleton radius="full" className="h-12 w-12" />
      </div>
    </div>
  ),
};

export const CardExample: Story = {
  render: () => (
    <div className="border rounded-lg p-4 space-y-4 w-[300px]">
      <div className="space-y-2">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      
      <Skeleton className="h-[125px] w-full rounded-md" />
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[75%]" />
      </div>
      
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  ),
};

export const ProfileExample: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-[350px]">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
};

export const TableExample: Story = {
  render: () => (
    <div className="border rounded-md w-[400px]">
      <div className="flex p-4 border-b">
        <Skeleton className="h-5 w-[35%] mr-4" />
        <Skeleton className="h-5 w-[30%] mr-4" />
        <Skeleton className="h-5 w-[25%]" />
      </div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex p-4 border-b last:border-0">
          <Skeleton className="h-4 w-[35%] mr-4" />
          <Skeleton className="h-4 w-[30%] mr-4" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
      ))}
    </div>
  ),
};

export const LoadingStateToggle: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);
    
    // Simular carga de datos
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div className="space-y-4 w-[350px]">
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => setIsLoading(!isLoading)}
        >
          {isLoading ? "Mostrar contenido" : "Mostrar skeleton"}
        </button>
        
        <div className="border rounded-lg p-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Contenido cargado</h3>
              <div className="h-20 bg-muted/30 flex items-center justify-center rounded-md">
                Imagen de ejemplo
              </div>
              <p className="text-sm">
                Este es el contenido real que aparece una vez que los datos se han cargado.
                En un caso real, estos datos provendrían de una API o de alguna fuente asíncrona.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
