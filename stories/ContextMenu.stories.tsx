import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "../components/ui/ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Haz clic derecho aquí
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Volver atrás
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Avanzar
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Recargar
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Más herramientas</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Guardar página como...
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Crear acceso directo...</ContextMenuItem>
            <ContextMenuItem>Imprimir...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Mostrar barra de herramientas
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Mostrar marcadores</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel>Usuario</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
          <ContextMenuRadioItem value="juan">Juan</ContextMenuRadioItem>
          <ContextMenuRadioItem value="lucia">Lucía</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Haz clic derecho aquí (Checkboxes interactivos)
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuCheckboxItem 
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Mostrar barra de estado
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem 
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Mostrar barra de actividad
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem 
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Mostrar panel
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Configuración
            <ContextMenuShortcut>⌘,</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [position, setPosition] = useState("bottom");
    
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Haz clic derecho aquí (Radio items interactivos)
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
            <ContextMenuLabel>Posición del Panel</ContextMenuLabel>
            <ContextMenuRadioItem value="top">Superior</ContextMenuRadioItem>
            <ContextMenuRadioItem value="right">Derecha</ContextMenuRadioItem>
            <ContextMenuRadioItem value="bottom">Inferior</ContextMenuRadioItem>
            <ContextMenuRadioItem value="left">Izquierda</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem inset>
            Posición actual: {position}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Haz clic derecho aquí (Menús anidados)
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Nuevo archivo
          <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Nuevo</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Proyecto...
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Más opciones</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>Carpeta</ContextMenuItem>
                <ContextMenuItem>Workspace</ContextMenuItem>
                <ContextMenuItem>Marco de trabajo</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem>Módulo</ContextMenuItem>
            <ContextMenuItem>Paquete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Editar</ContextMenuLabel>
          <ContextMenuItem>
            Deshacer
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Rehacer
            <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
