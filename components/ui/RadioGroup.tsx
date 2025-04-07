"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

type RadioGroupContextProps = {
  name: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextProps>({
  name: "",
})

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * El valor seleccionado en el grupo de radio
   */
  value?: string
  /**
   * Función que se llama cuando cambia el valor seleccionado
   */
  onValueChange?: (value: string) => void
  /**
   * Nombre único para el grupo de radio
   */
  name?: string
  /**
   * Si el grupo de radio está deshabilitado
   */
  disabled?: boolean
  /**
   * Si el grupo de radio es obligatorio
   */
  required?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name = React.useId(), disabled, ...props }, ref) => {
    // Generar un ID único para el grupo si no se proporciona uno
    const contextValue = React.useMemo(
      () => ({ name, value, onValueChange, disabled }),
      [name, value, onValueChange, disabled]
    )

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          role="radiogroup"
          ref={ref}
          className={cn("grid gap-2", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * El valor del ítem de radio
   */
  value: string
  /**
   * Si el ítem de radio está deshabilitado
   */
  disabled?: boolean
}

const RadioGroupItem = React.forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const { name, value: groupValue, onValueChange, disabled: groupDisabled } = React.useContext(RadioGroupContext)
    const itemDisabled = disabled || groupDisabled
    const checked = value === groupValue
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onValueChange?.(value)
      }
    }

    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-2 cursor-pointer",
          itemDisabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={itemDisabled}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow",
              "focus-within:ring-1 focus-within:ring-ring outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              checked && "border-primary"
            )}
          >
            {checked && (
              <div className="flex items-center justify-center">
                <Circle className="h-3.5 w-3.5 fill-primary" />
              </div>
            )}
          </div>
        </div>
        {props.children && (
          <span className={cn("text-sm", itemDisabled && "opacity-70")}>
            {props.children}
          </span>
        )}
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
