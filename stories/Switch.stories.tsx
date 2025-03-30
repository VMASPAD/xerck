import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../components/ui/Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Estado del switch (controlado)",
    },
    defaultChecked: {
      control: "boolean",
      description: "Estado inicial del switch (no controlado)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Tamaño del switch",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el switch",
    },
    label: {
      control: "text",
      description: "Etiqueta del switch",
    },
    labelPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Posición de la etiqueta",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const WithLabel: Story = {
  args: {
    defaultChecked: true,
    label: "Modo oscuro",
  },
};

export const LabelLeft: Story = {
  args: {
    defaultChecked: true,
    label: "Notificaciones",
    labelPosition: "left",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "No disponible",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch size="sm" label="Pequeño" />
        <Switch size="md" label="Mediano" defaultChecked />
        <Switch size="lg" label="Grande" />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="space-y-4">
        <Switch 
          checked={checked} 
          onCheckedChange={setChecked}
          label={checked ? "Activo" : "Inactivo"}
        />
        
        <div className="text-sm text-center">
          Estado actual: <span className="font-medium">{checked ? "Encendido" : "Apagado"}</span>
        </div>
        
        <button
          className="px-3 py-1 text-sm bg-primary text-white rounded-md"
          onClick={() => setChecked(!checked)}
        >
          Cambiar estado
        </button>
      </div>
    );
  },
};

export const MultipleOptions: Story = {
  render: () => {
    const [options, setOptions] = useState({
      notifications: true,
      sound: false,
      updates: true,
    });
    
    const handleChange = (option: keyof typeof options) => (value: boolean) => {
      setOptions(prev => ({ ...prev, [option]: value }));
    };
    
    return (
      <div className="w-[300px] space-y-4 rounded-md border p-4">
        <h3 className="text-lg font-medium mb-2">Configuración</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Notificaciones</span>
            <Switch 
              checked={options.notifications}
              onCheckedChange={handleChange("notifications")}
              size="sm"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Sonidos</span>
            <Switch 
              checked={options.sound}
              onCheckedChange={handleChange("sound")}
              size="sm"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Actualizaciones automáticas</span>
            <Switch 
              checked={options.updates}
              onCheckedChange={handleChange("updates")}
              size="sm"
            />
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2">
          Opciones actuales: {Object.entries(options)
            .filter(([_, enabled]) => enabled)
            .map(([key]) => key)
            .join(", ")}
        </div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      acceptTerms: false,
      newsletter: true,
      darkMode: false,
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Formulario enviado: ${JSON.stringify(formData, null, 2)}`);
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-[350px] space-y-4 rounded-md border p-4">
        <h3 className="text-lg font-medium">Preferencias de usuario</h3>
        
        <div className="space-y-3">
          <div>
            <Switch 
              name="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked }))}
              label="Acepto los términos y condiciones"
              required
            />
          </div>
          
          <div>
            <Switch 
              name="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked }))}
              label="Suscribirme al boletín de noticias"
            />
          </div>
          
          <div>
            <Switch 
              name="darkMode"
              checked={formData.darkMode}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, darkMode: checked }))}
              label="Activar modo oscuro"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            disabled={!formData.acceptTerms}
          >
            Guardar preferencias
          </button>
        </div>
      </form>
    );
  },
};

export const CustomStyle: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch 
        defaultChecked
        className="[&>div]:bg-green-500 [&>div]:data-[state=unchecked]:bg-red-500"
        label="Verde (on) / Rojo (off)"
      />
      
      <Switch 
        defaultChecked
        className="[&>div]:bg-blue-500"
        label="Azul cuando está activo"
      />
      
      <Switch 
        className="[&>div]:border-dashed [&>div]:border-current [&>div]:data-[state=checked]:border-green-500"
        label="Borde punteado"
      />
    </div>
  ),
};
