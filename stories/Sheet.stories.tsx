import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "../components/ui/Sheet";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Abrir Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Realiza cambios en tu perfil aquí. Haz click en guardar cuando termines.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium">
              Usuario
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md mr-2">
            Cancelar
          </SheetClose>
          <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Guardar cambios
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Sheet Izquierdo
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menú de navegación</SheetTitle>
          <SheetDescription>
            Accede rápidamente a las secciones de la aplicación.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <nav className="grid gap-2">
            {["Inicio", "Productos", "Clientes", "Reportes", "Configuración"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <SheetFooter className="justify-start">
          <SheetClose className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md mr-2">
            Cerrar sesión
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Sheet Superior
      </SheetTrigger>
      <SheetContent side="top" className="py-8 px-8">
        <SheetHeader>
          <SheetTitle>Notificaciones</SheetTitle>
          <SheetDescription>
            Revisa tus últimas notificaciones.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-2 py-4 max-h-[50vh] overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-md border border-input p-3 text-sm"
            >
              <div className="font-medium">Notificación {i}</div>
              <div className="text-muted-foreground">
                Esta es una notificación de ejemplo que muestra un mensaje.
              </div>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md mr-2">
            Cerrar
          </SheetClose>
          <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Ver todas
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Sheet Inferior
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-96 py-8">
        <SheetHeader>
          <SheetTitle>Configuración rápida</SheetTitle>
          <SheetDescription>
            Ajusta rápidamente las configuraciones comunes.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4 overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-medium">Configuración {i}</span>
              <Button className="h-6 w-11 rounded-full bg-muted"></Button>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md mr-2">
            Cancelar
          </SheetClose>
          <SheetClose className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Guardar
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Abrir Sheet Controlado
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
          >
            Cerrar Sheet
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Estado actual: {open ? "Abierto" : "Cerrado"}
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Controlado</SheetTitle>
              <SheetDescription>
                Este sheet es controlado programáticamente.
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <p className="text-sm">
                Este Sheet se abre y cierra mediante los botones externos.
                También puedes cerrarlo mediante el botón X o haciendo clic en el overlay.
              </p>
            </div>
            <SheetFooter>
              <Button
                onClick={() => setOpen(false)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Entendido
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const MultiStep: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button
          onClick={() => {
            setStep(1);
            setOpen(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Iniciar proceso
        </Button>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Configuración de cuenta</SheetTitle>
              <SheetDescription>
                Paso {step} de 3
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Información personal</h3>
                  <div className="grid gap-2">
                    <input
                      placeholder="Nombre completo"
                      className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    />
                    <input
                      placeholder="Correo electrónico"
                      className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Preferencias</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Recibir notificaciones</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Boletín informativo</span>
                    </label>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Confirmación</h3>
                  <p className="text-sm">
                    Tu cuenta ha sido configurada correctamente. Haz clic en finalizar para completar el proceso.
                  </p>
                </div>
              )}
            </div>
            
            <SheetFooter>
              {step > 1 && (
                <Button
                  onClick={() => setStep((prev) => prev - 1)}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md mr-2"
                >
                  Anterior
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  onClick={() => setStep((prev) => prev + 1)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Finalizar
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Sheet defaultOpen={false}>
      <SheetTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Alternar Sheet (Abierto por defecto)
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet abierto por defecto</SheetTitle>
          <SheetDescription>
            Este Sheet se muestra abierto inicialmente gracias a defaultOpen=true
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <p className="text-sm">
            Este es un ejemplo de un Sheet que está configurado para mostrarse abierto por defecto.
            Puedes cerrarlo con el botón X o haciendo clic en el overlay.
          </p>
        </div>
        <SheetFooter>
          <SheetClose className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Cerrar
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
