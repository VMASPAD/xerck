import React, { useState } from "react"
import { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "El valor seleccionado en el grupo de radio",
    },
    disabled: {
      control: "boolean",
      description: "Si el grupo de radio está deshabilitado",
    },
    required: {
      control: "boolean",
      description: "Si el grupo de radio es obligatorio",
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("default")
    
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <label htmlFor="r1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Default
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <label htmlFor="r2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Comfortable
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <label htmlFor="r3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Compact
          </label>
        </div>
      </RadioGroup>
    )
  },
}

export const WithChildLabels: Story = {
  render: () => {
    const [value, setValue] = useState("dog")
    
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem value="dog">Perro</RadioGroupItem>
        <RadioGroupItem value="cat">Gato</RadioGroupItem>
        <RadioGroupItem value="rabbit">Conejo</RadioGroupItem>
        <RadioGroupItem value="hamster">Hámster</RadioGroupItem>
      </RadioGroup>
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("one")
    
    return (
      <RadioGroup 
        value={value} 
        onValueChange={setValue} 
        className="flex flex-row space-x-4"
      >
        <RadioGroupItem value="one">Opción 1</RadioGroupItem>
        <RadioGroupItem value="two">Opción 2</RadioGroupItem>
        <RadioGroupItem value="three">Opción 3</RadioGroupItem>
      </RadioGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("no")
    
    return (
      <div className="space-y-6">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="yes">Habilitado</RadioGroupItem>
          <RadioGroupItem value="no">También habilitado</RadioGroupItem>
          <RadioGroupItem value="maybe" disabled>
            Deshabilitado
          </RadioGroupItem>
        </RadioGroup>
        
        <RadioGroup value={value} onValueChange={setValue} disabled>
          <RadioGroupItem value="all-1">Todo el grupo deshabilitado 1</RadioGroupItem>
          <RadioGroupItem value="all-2">Todo el grupo deshabilitado 2</RadioGroupItem>
          <RadioGroupItem value="all-3">Todo el grupo deshabilitado 3</RadioGroupItem>
        </RadioGroup>
      </div>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      plan: "basic",
      notifications: "all",
    })
    
    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Formulario enviado con: ${JSON.stringify(formData, null, 2)}`)
    }
    
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Plan de suscripción</h3>
          <RadioGroup 
            name="plan" 
            value={formData.plan} 
            onValueChange={handleChange("plan")}
            className="space-y-3"
          >
            <div className="flex items-center justify-between rounded-lg border p-4">
              <RadioGroupItem value="basic">
                Plan Básico - $9.99/mes
              </RadioGroupItem>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <RadioGroupItem value="pro">
                Plan Pro - $19.99/mes
              </RadioGroupItem>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <RadioGroupItem value="enterprise">
                Plan Empresarial - $49.99/mes
              </RadioGroupItem>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preferencias de notificación</h3>
          <RadioGroup 
            name="notifications" 
            value={formData.notifications} 
            onValueChange={handleChange("notifications")}
          >
            <RadioGroupItem value="all">Todas las notificaciones</RadioGroupItem>
            <RadioGroupItem value="important">Solo notificaciones importantes</RadioGroupItem>
            <RadioGroupItem value="none">Sin notificaciones</RadioGroupItem>
          </RadioGroup>
        </div>
        
        <button 
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Guardar preferencias
        </button>
      </form>
    )
  },
}

export const CustomStyles: Story = {
  render: () => {
    const [value, setValue] = useState("blue")
    
    return (
      <RadioGroup 
        value={value} 
        onValueChange={setValue} 
        className="flex flex-col space-y-3"
      >
        <RadioGroupItem 
          value="red" 
          className="[&>div]:border-red-500 [&_svg]:fill-red-500"
        >
          <span className="ml-2 text-red-500 font-medium">Rojo</span>
        </RadioGroupItem>
        <RadioGroupItem 
          value="blue" 
          className="[&>div]:border-blue-500 [&_svg]:fill-blue-500"
        >
          <span className="ml-2 text-blue-500 font-medium">Azul</span>
        </RadioGroupItem>
        <RadioGroupItem 
          value="green" 
          className="[&>div]:border-green-500 [&_svg]:fill-green-500"
        >
          <span className="ml-2 text-green-500 font-medium">Verde</span>
        </RadioGroupItem>
        <RadioGroupItem 
          value="purple" 
          className="[&>div]:border-purple-500 [&_svg]:fill-purple-500"
        >
          <span className="ml-2 text-purple-500 font-medium">Púrpura</span>
        </RadioGroupItem>
      </RadioGroup>
    )
  },
}
