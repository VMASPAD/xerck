import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./Dialog";
import { Button } from "./Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Estado de apertura controlado",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial de apertura (modo no controlado)",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback cuando cambia el estado",
    },
    closeOnOutsideClick: {
      control: "boolean",
      description: "Si se cierra al hacer clic fuera del diálogo",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta
            y eliminará tus datos de nuestros servidores.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Confirmar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    defaultOpen: false,
    closeOnOutsideClick: true,
  },
};

export const WithForm: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Realiza cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              defaultValue="Pedro Duque"
              className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              defaultValue="@pedroduque"
              className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Guardar cambios</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    defaultOpen: false,
    closeOnOutsideClick: true,
  },
};

export const NoCloseOnOutsideClick: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="destructive">Acción crítica</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmación requerida</DialogTitle>
          <DialogDescription>
            Esta es una acción crítica que requiere tu confirmación explícita.
            No se puede cerrar el diálogo haciendo clic fuera.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Debes hacer una elección específica para continuar.
          </p>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Confirmar eliminación</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    defaultOpen: false,
    closeOnOutsideClick: false,
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
        <p>Estado del diálogo: {open ? "Abierto" : "Cerrado"}</p>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Diálogo controlado</DialogTitle>
              <DialogDescription>
                Este diálogo está completamente controlado mediante estado de React.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                Puedes controlar el estado de apertura/cierre con cualquier lógica de tu aplicación.
              </p>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <DialogClose asChild>
                <Button>Aceptar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
