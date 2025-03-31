import { Meta, StoryObj } from "@storybook/react";
import AlertDialog from "../components/ui/AlertDialog";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título del diálogo de alerta",
    },
    description: {
      control: "text",
      description: "Descripción del diálogo de alerta",
    },
    actionLabel: {
      control: "text",
      description: "Texto del botón de confirmación",
    },
    cancelLabel: {
      control: "text",
      description: "Texto del botón de cancelación",
    },
    triggerLabel: {
      control: "text",
      description: "Texto del botón que abre el diálogo",
    },
    actionVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Variante del botón de acción",
    },
    cancelVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Variante del botón de cancelación",
    },
    triggerVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "Variante del botón que abre el diálogo",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial del diálogo (abierto/cerrado)",
      defaultValue: false
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "¿Estás absolutamente seguro?",
    description: "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.",
    actionLabel: "Continuar",
    cancelLabel: "Cancelar",
    triggerLabel: "Abrir diálogo",
    actionVariant: "default",
    cancelVariant: "outline",
    triggerVariant: "default",
    defaultOpen: false,
  },
};

export const Destructive: Story = {
  args: {
    title: "¿Eliminar cuenta?",
    description: "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos tus datos.",
    actionLabel: "Eliminar",
    cancelLabel: "Cancelar",
    actionVariant: "destructive",
    cancelVariant: "outline",
    defaultOpen: false, 
  },
};

export const InfoConfirmation: Story = {
  args: {
    title: "Información importante",
    description: "Por favor lee y confirma que entiendes esta información antes de continuar.",
    actionLabel: "Entiendo",
    cancelLabel: "Revisar más tarde",
    actionVariant: "secondary",
    cancelVariant: "ghost",
    defaultOpen: false
  },
}

export const WarningAction: Story = {
  args: {
    title: "Advertencia",
    description: "Esta acción podría tener consecuencias importantes. Por favor asegúrate de entender los efectos antes de continuar.",
    actionLabel: "Proceder de todas formas",
    cancelLabel: "Volver atrás",
    actionVariant: "default",
    cancelVariant: "ghost",
    defaultOpen: false,
    triggerLabel: "Acción peligrosa",
    triggerVariant: "outline",
  },
}

export const IconTrigger: Story = {
  args: {
    title: "Configuración avanzada",
    description: "Estás por acceder a configuraciones avanzadas del sistema. Estos cambios pueden afectar al rendimiento.",
    actionLabel: "Continuar",
    cancelLabel: "Cancelar",
    actionVariant: "default",
    cancelVariant: "outline",
    defaultOpen: false, 
  },
};

export const SuccessAction: Story = {
  args: {
    title: "Operación completada",
    description: "La operación se ha realizado correctamente. ¿Deseas confirmar los cambios?",
    actionLabel: "Guardar cambios",
    cancelLabel: "Descartar",
    actionVariant: "default",
    cancelVariant: "ghost",
    defaultOpen: false, 
  },
};
