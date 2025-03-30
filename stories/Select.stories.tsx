import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar fruta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manzana">Manzana</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="naranja">Naranja</SelectItem>
          <SelectItem value="uva">Uva</SelectItem>
          <SelectItem value="fresa">Fresa</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Seleccionar alimento" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frutas</SelectLabel>
            <SelectItem value="manzana">Manzana</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="naranja">Naranja</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Verduras</SelectLabel>
            <SelectItem value="zanahoria">Zanahoria</SelectItem>
            <SelectItem value="brocoli">Brócoli</SelectItem>
            <SelectItem value="espinaca">Espinaca</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Proteínas</SelectLabel>
            <SelectItem value="pollo">Pollo</SelectItem>
            <SelectItem value="carne">Carne</SelectItem>
            <SelectItem value="pescado">Pescado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex flex-col space-y-4">
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select deshabilitado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Manzana</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Opciones deshabilitadas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manzana">Manzana</SelectItem>
            <SelectItem value="banana" disabled>Banana</SelectItem>
            <SelectItem value="naranja">Naranja</SelectItem>
            <SelectItem value="uva" disabled>Uva</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    return (
      <Select defaultValue="naranja">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar fruta" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manzana">Manzana</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="naranja">Naranja</SelectItem>
          <SelectItem value="uva">Uva</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

export const WithManyOptions: Story = {
  render: () => {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar país" />
        </SelectTrigger>
        <SelectContent>
          {[
            "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", 
            "Costa Rica", "Cuba", "Ecuador", "El Salvador", "Guatemala", 
            "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", 
            "Perú", "República Dominicana", "Uruguay", "Venezuela"
          ].map((country) => (
            <SelectItem key={country} value={country.toLowerCase()}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      country: "",
      city: "",
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Formulario enviado: ${JSON.stringify(formData, null, 2)}`);
    };
    
    const cities = {
      españa: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
      méxico: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
      argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-1">
          <label htmlFor="country" className="text-sm font-medium">
            País
          </label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value, city: "" }))}
            name="country"
            required
          >
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Seleccionar país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="españa">España</SelectItem>
              <SelectItem value="méxico">México</SelectItem>
              <SelectItem value="argentina">Argentina</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="city" className="text-sm font-medium">
            Ciudad
          </label>
          <Select
            value={formData.city}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
            name="city"
            disabled={!formData.country}
            required
          >
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder={formData.country ? "Seleccionar ciudad" : "Primero selecciona un país"} />
            </SelectTrigger>
            <SelectContent>
              {formData.country &&
                cities[formData.country as keyof typeof cities]?.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          disabled={!formData.country || !formData.city}
        >
          Enviar
        </button>
      </form>
    );
  },
};

export const Customized: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px] bg-blue-50 border-blue-200 hover:bg-blue-100 focus:ring-blue-500">
          <SelectValue placeholder="Tema personalizado" />
        </SelectTrigger>
        <SelectContent className="border-blue-200 bg-blue-50">
          <SelectGroup>
            <SelectLabel className="text-blue-600">Categorías</SelectLabel>
            <SelectItem 
              value="design" 
              className="focus:bg-blue-100 focus:text-blue-800 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-800"
            >
              Diseño
            </SelectItem>
            <SelectItem 
              value="development"
              className="focus:bg-blue-100 focus:text-blue-800 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-800"
            >
              Desarrollo
            </SelectItem>
            <SelectItem 
              value="marketing"
              className="focus:bg-blue-100 focus:text-blue-800 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-800"
            >
              Marketing
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};
