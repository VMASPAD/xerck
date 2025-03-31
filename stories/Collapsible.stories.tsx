import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "../components/ui/Collapsible";
import { Button } from "../components/ui/button";
import { Terminal } from "lucide-react";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Estado de apertura del collapsible (modo controlado)",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial de apertura (modo no controlado)",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback cuando cambia el estado de apertura",
    },
    disabled: {
      control: "boolean",
      description: "Estado deshabilitado del collapsible",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} className="w-full border rounded-md">
        <CollapsibleTrigger className="bg-card hover:bg-muted">
          Haz clic para expandir
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Este es el contenido que se muestra u oculta al hacer clic en el trigger.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  args: {
    defaultOpen: false,
  },
};

export const WithCustomIcon: Story = {
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} className="w-full border rounded-md">
        <CollapsibleTrigger 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          iconClassName="text-primary-foreground"
        >   
          Collapsible con icono personalizado 
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Contenido con un estilo personalizado para el icono y el trigger.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  args: {
    defaultOpen: false,
  },
};

export const WithoutIcon: Story = {
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} className="w-full border rounded-md">
        <CollapsibleTrigger showIcon={false} className="bg-secondary text-secondary-foreground">
          Collapsible sin icono
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Este collapsible no muestra un icono en el trigger.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  args: {
    defaultOpen: false,
  },
};

// Ejemplo controlado mejorado con el componente Button
export const ControlledExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="w-80 space-y-4">
        <Collapsible 
          open={isOpen} 
          onOpenChange={setIsOpen}
          className="w-full border rounded-md"
        >
          <CollapsibleTrigger className="bg-card hover:bg-muted">
            Collapsible controlado
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>Este collapsible está controlado por el estado de React.</p>
          </CollapsibleContent>
        </Collapsible>
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="default"
        >
          {isOpen ? "Cerrar" : "Abrir"} collapsible
        </Button>
      </div>
    );
  },
};

// Añadir un ejemplo con múltiples paneles
export const MultipleCollapsibles: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      {["Sección 1", "Sección 2", "Sección 3"].map((section, index) => (
        <Collapsible key={section} className="border rounded-md" defaultOpen={index === 0}>
          <CollapsibleTrigger className={index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"}>
            {section}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>Contenido para {section.toLowerCase()}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  ),
};
