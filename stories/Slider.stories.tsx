import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../components/ui/Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Valor actual del Slider",
    },
    min: {
      control: { type: "number" },
      description: "Valor mínimo del Slider",
    },
    max: {
      control: { type: "number" },
      description: "Valor máximo del Slider",
    },
    step: {
      control: { type: "number" },
      description: "Tamaño del paso",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el Slider",
    },
    multiple: {
      control: "boolean",
      description: "Habilitar selección de rango (dos thumbs)",
    },
    showMarks: {
      control: "boolean",
      description: "Mostrar marcas en el track",
    },
    markInterval: {
      control: { type: "number" },
      description: "Intervalo entre marcas",
    },
    showValues: {
      control: "boolean",
      description: "Mostrar valores sobre los thumbs",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: 50,
  },
};

export const RangeSlider: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: [25, 75],
    multiple: true,
  },
};

export const WithMarks: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: 50,
    showMarks: true,
    markInterval: 25,
  },
};

export const WithValues: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: 50,
    showValues: true,
  },
};

export const RangeWithValues: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: [25, 75],
    multiple: true,
    showValues: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="space-y-8 w-[300px]">
        <Slider 
          value={value} 
          onValueChange={(newValue) => setValue(newValue as number)}
          showValues
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Valor actual: {value}</span>
          <button 
            className="px-2 py-1 text-sm bg-primary text-white rounded-md"
            onClick={() => setValue(Math.floor(Math.random() * 100))}
          >
            Valor aleatorio
          </button>
        </div>
      </div>
    );
  },
};

export const RangeControlled: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([20, 80]);
    
    return (
      <div className="space-y-8 w-[300px]">
        <Slider 
          value={range} 
          onValueChange={(newValue) => setRange(newValue as [number, number])}
          multiple
          showValues
        />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Mínimo: {range[0]}</span>
            <span className="text-sm">Máximo: {range[1]}</span>
          </div>
          <div className="text-sm">
            Rango: {range[1] - range[0]}
          </div>
        </div>
      </div>
    );
  },
};

export const CustomMinMax: Story = {
  args: {
    className: "w-[300px]",
    min: -50,
    max: 50,
    defaultValue: 0,
    showValues: true,
    showMarks: true,
    markInterval: 25,
  },
};

export const CustomStep: Story = {
  args: {
    className: "w-[300px]",
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    showValues: true,
    showMarks: true,
    markInterval: 20,
  },
};

export const Disabled: Story = {
  args: {
    className: "w-[300px]",
    defaultValue: 30,
    disabled: true,
  },
};

export const SliderWithLivePreview: Story = {
  render: () => {
    const [value, setValue] = useState<number>(50);
    
    return (
      <div className="space-y-8 w-[300px]">
        <div 
          className="h-20 w-full rounded-md border flex items-center justify-center transition-all"
          style={{ backgroundColor: `rgba(0, 0, 255, ${value / 100})` }}
        >
          <span className="font-medium text-white drop-shadow-sm">
            Opacidad: {value}%
          </span>
        </div>
        
        <Slider 
          value={value} 
          onValueChange={(newValue) => setValue(newValue as number)}
        />
      </div>
    );
  },
};

export const SliderWithTemperature: Story = {
  render: () => {
    const [temp, setTemp] = useState<number>(24);
    
    // Generar un color basado en la temperatura
    const getColor = (temperature: number) => {
      // Frío (azul) a caliente (rojo)
      if (temperature < 10) return "#0ea5e9"; // Azul frío
      if (temperature < 18) return "#06b6d4"; // Cian
      if (temperature < 24) return "#22c55e"; // Verde
      if (temperature < 30) return "#eab308"; // Amarillo
      return "#ef4444"; // Rojo caliente
    };
    
    return (
      <div className="w-[300px] space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: getColor(temp) }}>
            {temp}°C
          </div>
          <div className="text-sm text-gray-500">
            {temp < 18 ? "Frío" : temp < 24 ? "Agradable" : "Calor"}
          </div>
        </div>
        
        <Slider 
          min={5}
          max={35}
          step={1}
          value={temp} 
          onValueChange={(newValue) => setTemp(newValue as number)}
          showMarks
          markInterval={5}
        />
      </div>
    );
  },
};
