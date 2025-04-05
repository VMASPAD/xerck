import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "../components/ui/DropdownMenu";
import { Button } from "../components/ui/button";
import { User, CreditCard, Settings, LogOut, Mail, Plus, Cloud, Github, LifeBuoy } from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Estado controlado del menú",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial del menú (no controlado)",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback cuando cambia el estado de apertura",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Abrir Menú</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Facturación</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {
    defaultOpen: false,
  },
};

export const WithCheckboxItems: Story = {
  render: (args) => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Opciones de Visualización</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Apariencia</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Barra de estado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Barra de actividad
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel lateral
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Otras configuraciones...
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  args: {
    defaultOpen: false,
  },
};

export const WithRadioItems: Story = {
  render: (args) => {
    const [position, setPosition] = useState("bottom");
    
    // Configuración de posicionamiento basada en la selección
    const getPositioningProps = () => {
      switch (position) {
        case "top":
          return { 
            align: "center" as const, 
            // Posicionamos el menú arriba del botón
            sideOffset: -4 // Valor negativo para que aparezca arriba
          };
        case "right":
          return { 
            align: "end" as const, 
            alignOffset: 4
          };
        case "left":
          return { 
            align: "start" as const,
            alignOffset: -4
          };
        case "bottom":
        default:
          return { 
            align: "center" as const, 
            sideOffset: 4 // Valor positivo para que aparezca abajo
          };
      }
    };

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Posición del Panel: {position}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" {...getPositioningProps()}>
          <DropdownMenuLabel>Posición del Panel</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Superior</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Derecha</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Inferior</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">Izquierda</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            Posición actual: {position}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  args: {
    defaultOpen: false,
  },
};

export const WithSubmenus: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Nuevo elemento</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          <span>Correo</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className="mr-2 h-4 w-4" />
            <span>Nuevo</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>
              <Cloud className="mr-2 h-4 w-4" />
              Proyecto en la nube...
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Github className="mr-2 h-4 w-4" />
                <span>Desde GitHub</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Clonar repositorio</DropdownMenuItem>
                <DropdownMenuItem>Importar Gist</DropdownMenuItem>
                <DropdownMenuItem>GitHub Desktop</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              Desde plantilla...
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Accesos Directos</DropdownMenuLabel>
          <DropdownMenuItem>Proyecto Reciente</DropdownMenuItem>
          <DropdownMenuItem>Plantillas Guardadas</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {
    defaultOpen: false,
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(!open)}>
          {open ? "Cerrar Menú" : "Abrir Menú"}
        </Button>
        
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menú Controlado</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(false)}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar este menú</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
