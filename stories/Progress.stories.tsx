import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../components/ui/Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "El valor actual del progreso, entre 0 y 100",
    },
    showValue: {
      control: "boolean",
      description: "Indica si debe mostrar el valor como texto",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "El valor máximo del progreso",
    },
    valueFormat: {
      control: "text",
      description: "El formato en el que se muestra el valor. Use {value} como placeholder.",
    },
    colors: {
      control: "object",
      description: "Colores personalizados para la barra de progreso",
    },
    animationDuration: {
      control: "text",
      description: "La velocidad de la animación de transición",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 40,
    className: "w-[350px]",
  },
};

export const WithValueDisplay: Story = {
  args: {
    value: 65,
    showValue: true,
    className: "w-[350px] h-6",
  },
};

export const CustomColors: Story = {
  args: {
    value: 80,
    showValue: true,
    className: "w-[350px] h-6",
    colors: {
      background: "#f1f5f9", // slate-100
      indicator: "#0ea5e9", // sky-500
      valueText: "#0369a1", // sky-700
    },
  },
};

export const CustomFormat: Story = {
  args: {
    value: 75,
    showValue: true,
    className: "w-[350px] h-6",
    valueFormat: "{value}/100 completado",
  },
};

export const DifferentMax: Story = {
  args: {
    value: 350,
    max: 1000,
    showValue: true,
    className: "w-[350px] h-6",
    valueFormat: "{value}% de 1000",
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-[350px]">
      <Progress value={60} className="h-1" />
      <Progress value={60} className="h-2" />
      <Progress value={60} className="h-4" />
      <Progress value={60} className="h-6" showValue />
      <Progress value={60} className="h-8" showValue />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 5;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="w-[350px] space-y-4">
        <div className="text-center mb-2">
          Progreso: {progress}%
        </div>
        <Progress value={progress} className="h-3" />
        <Progress value={progress} className="h-6" showValue />
      </div>
    );
  },
};

export const LoadingStates: Story = {
  render: () => {
    const states = [
      { name: "Cargando", value: 25 },
      { name: "En proceso", value: 50 },
      { name: "Casi listo", value: 75 },
      { name: "Completado", value: 100 },
    ];
    
    return (
      <div className="w-[350px] space-y-6">
        {states.map((state) => (
          <div key={state.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{state.name}</span>
              <span>{state.value}%</span>
            </div>
            <Progress 
              value={state.value} 
              className="h-2" 
              colors={{
                indicator: state.value === 100 ? "#22c55e" : undefined, // verde si está completo
              }}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const ProgressWithSteps: Story = {
  render: () => {
    const steps = ["Información", "Pago", "Confirmación", "Completado"];
    const currentStep = 2; // 0-based index
    const progressValue = ((currentStep + 1) / steps.length) * 100;
    
    return (
      <div className="w-[350px] space-y-6">
        <Progress 
          value={progressValue} 
          className="h-2 mb-4" 
        />
        
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={`flex flex-col items-center gap-2 ${
                index <= currentStep 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  index <= currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
