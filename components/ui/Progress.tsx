"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * El valor actual del progreso, entre 0 y 100
   */
  value?: number
  /**
   * Indica si debe mostrar el valor como texto
   */
  showValue?: boolean
  /**
   * El valor máximo del progreso
   * @default 100
   */
  max?: number
  /**
   * El formato en el que se muestra el valor
   * @default "{value}%"
   */
  valueFormat?: string
  /**
   * Colores personalizados para las siguientes propiedades:
   * - background: Color de fondo de la barra de progreso
   * - indicator: Color del indicador de progreso
   * - valueText: Color del texto del valor
   */
  colors?: {
    background?: string
    indicator?: string
    valueText?: string
  }
  /**
   * La velocidad de la animación de transición
   * @default "0.3s"
   */
  animationDuration?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    showValue = false, 
    max = 100, 
    valueFormat = "{value}%",
    colors,
    animationDuration = "0.3s",
    ...props 
  }, ref) => {
    // Asegurarse de que el valor está entre 0 y max
    const normalizedValue = Math.max(0, Math.min(value || 0, max))
    const percentage = (normalizedValue / max) * 100
    
    // Formatear el valor para mostrar
    const formattedValue = valueFormat.replace("{value}", Math.round(percentage).toString())
    
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={normalizedValue}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        style={{
          backgroundColor: colors?.background,
        }}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{
            transform: `translateX(-${100 - percentage}%)`,
            backgroundColor: colors?.indicator,
            transition: `transform ${animationDuration} ease-in-out`,
          }}
        />
        
        {showValue && (
          <span 
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{
              color: colors?.valueText || "currentColor",
            }}
          >
            {formattedValue}
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
