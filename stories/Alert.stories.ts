import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../components/ui/Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "info", "warning", "secondary", "outline"],
      description: "Estilo visual de la alerta",
    },
    title: {
      control: "text",
      description: "Título de la alerta",
    },
    description: {
      control: "text",
      description: "Descripción de la alerta",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Información por defecto",
    description: "Este es un mensaje de alerta por defecto para mostrar información.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Ha ocurrido un error. Por favor, intenta nuevamente.", 
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Éxito",
    description: "La operación se ha completado correctamente.", 
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Información",
    description: "Este mensaje contiene información importante para ti.", 
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Advertencia",
    description: "Ten cuidado al realizar esta acción.", 
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    title: "Notificación secundaria",
    description: "Esta alerta utiliza el esquema de color secundario.", 
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    title: "Alerta con contorno",
    description: "Esta alerta tiene un estilo de contorno simple.", 
  },
};