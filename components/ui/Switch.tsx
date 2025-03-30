"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * Cuando está marcado (encendido)
   */
  checked?: boolean
  
  /**
   * Estado predeterminado
   */
  defaultChecked?: boolean
  
  /**
   * Función que se ejecuta cuando cambia el estado
   */
  onCheckedChange?: (checked: boolean) => void
  
  /**
   * Tamaño del switch
   */
  size?: "sm" | "md" | "lg"
  
  /**
   * Si el switch está deshabilitado
   */
  disabled?: boolean
  
  /**
   * Si es requerido
   */
  required?: boolean
  
  /**
   * Etiqueta del switch
   */
  label?: string
  
  /**
   * Posición de la etiqueta
   */
  labelPosition?: "left" | "right"
}

/**
 * Componente Switch
 * 
 * Un control que permite al usuario alternar entre dos estados, como activado/desactivado.
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    checked,
    defaultChecked,
    onCheckedChange,
    size = "md",
    disabled = false,
    required = false,
    label,
    labelPosition = "right",
    id,
    ...props
  }, ref) => {
    // ID único para asociar la etiqueta con el input
    const uniqueId = React.useId();
    const switchId = id || `switch-${uniqueId}`;
    
    // Estado interno para el modo no controlado
    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      checked !== undefined ? checked : defaultChecked || false
    );
    
    // Actualizar el estado interno cuando cambia el valor desde el exterior
    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);
    
    // Valor actual (controlado o no controlado)
    const isChecked = checked !== undefined ? checked : internalChecked;
    
    // Manejar el cambio de estado
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
    };
    
    // Dimensiones por tamaño
    const sizeStyles = {
      sm: {
        switch: "h-4 w-7",
        thumb: "h-3 w-3",
        translate: "translate-x-3",
      },
      md: {
        switch: "h-5 w-9",
        thumb: "h-4 w-4",
        translate: "translate-x-4",
      },
      lg: {
        switch: "h-6 w-11",
        thumb: "h-5 w-5",
        translate: "translate-x-5",
      },
    };
    
    // Renderizar solo el switch
    const switchElement = (
      <div className={cn("inline-flex items-center", className)}>
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          aria-checked={isChecked}
          {...props}
        />
        <div
          className={cn(
            "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            isChecked ? "bg-primary" : "bg-input",
            sizeStyles[size].switch
          )}
          data-disabled={disabled ? "true" : undefined}
          data-state={isChecked ? "checked" : "unchecked"}
        >
          <span
            className={cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
              isChecked ? sizeStyles[size].translate : "translate-x-0",
              sizeStyles[size].thumb
            )}
          />
        </div>
      </div>
    );
    
    // Si no hay etiqueta, devolver solo el switch
    if (!label) {
      return switchElement;
    }
    
    // Con etiqueta
    return (
      <div className="flex items-center gap-2">
        {labelPosition === "left" && (
          <label
            htmlFor={switchId}
            className={cn(
              "text-sm font-medium leading-none",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
        
        {switchElement}
        
        {labelPosition === "right" && (
          <label
            htmlFor={switchId}
            className={cn(
              "text-sm font-medium leading-none",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
