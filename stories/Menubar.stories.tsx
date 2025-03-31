import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "../components/ui/Menubar";

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
    <Menubar className="w-96">
      <MenubarMenu>
        <MenubarTrigger>Archivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Nuevo <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Abrir <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Guardar <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Guardar como...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Imprimir <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Deshacer <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Rehacer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cortar <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copiar <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Pegar <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Ver</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Barra de estado</MenubarCheckboxItem>
          <MenubarCheckboxItem>Barra lateral</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Zoom in <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom out <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithNestedSubmenus: Story = {
  render: () => (
    <Menubar className="w-96">
      <MenubarMenu>
        <MenubarTrigger>Archivo</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Nuevo</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Documento de texto</MenubarItem>
              <MenubarItem>Hoja de cálculo</MenubarItem>
              <MenubarItem>Presentación</MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>Desde plantilla</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Plantilla 1</MenubarItem>
                  <MenubarItem>Plantilla 2</MenubarItem>
                  <MenubarItem>Plantilla 3</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            Abrir <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Guardar como... <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Preferencias</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Apariencia</MenubarLabel>
          <MenubarRadioGroup value="sistema">
            <MenubarRadioItem value="claro">Tema claro</MenubarRadioItem>
            <MenubarRadioItem value="oscuro">Tema oscuro</MenubarRadioItem>
            <MenubarRadioItem value="sistema">Usar tema del sistema</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarLabel>Configuración</MenubarLabel>
          <MenubarCheckboxItem checked>Restaurar sesión</MenubarCheckboxItem>
          <MenubarCheckboxItem>Actualizaciones automáticas</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [showMinimap, setShowMinimap] = useState(false);
    
    return (
      <Menubar className="w-96">
        <MenubarMenu>
          <MenubarTrigger>Ver</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem 
              checked={showStatusBar} 
              onCheckedChange={setShowStatusBar}
            >
              Barra de estado
            </MenubarCheckboxItem>
            <MenubarCheckboxItem 
              checked={showLineNumbers}
              onCheckedChange={setShowLineNumbers}
            >
              Números de línea
            </MenubarCheckboxItem>
            <MenubarCheckboxItem 
              checked={showMinimap}
              onCheckedChange={setShowMinimap}
            >
              Minimap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Estado actual:
            </MenubarItem>
            <MenubarItem inset className="text-muted-foreground">
              {[
                showStatusBar && "Barra de estado",
                showLineNumbers && "Números de línea",
                showMinimap && "Minimap"
              ].filter(Boolean).join(", ") || "Ninguna opción activada"}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [textSize, setTextSize] = useState("normal");
    
    return (
      <Menubar className="w-96">
        <MenubarMenu>
          <MenubarTrigger>Formato</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Tamaño de texto</MenubarLabel>
            <MenubarRadioGroup value={textSize} onValueChange={setTextSize}>
              <MenubarRadioItem value="small">Pequeño</MenubarRadioItem>
              <MenubarRadioItem value="normal">Normal</MenubarRadioItem>
              <MenubarRadioItem value="large">Grande</MenubarRadioItem>
              <MenubarRadioItem value="extra-large">Extra grande</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset className="text-muted-foreground">
              Tamaño actual: {
                {
                  "small": "Pequeño",
                  "normal": "Normal",
                  "large": "Grande",
                  "extra-large": "Extra grande"
                }[textSize]
              }
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
