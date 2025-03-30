"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Propiedades para el componente Separator
 */
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientación del separador
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
  
  /**
   * Decoración del separador (línea simple, doble, punteada, etc.)
   * @default "solid"
   */
  decorative?: boolean
  
  /**
   * Grosor del separador
   * @default "1px"
   */
  thickness?: string
  
  /**
   * Espacio antes y después del separador
   * @default "1rem"
   */
  spacing?: string
}

/**
 * Componente Separator
 * 
 * Un separador visual o semántico para dividir secciones de contenido.
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ 
    className,
    orientation = "horizontal",
    decorative = true,
    thickness = "1px",
    spacing = "1rem",
    ...props 
  }, ref) => {
    const separatorStyles = {
      "--separator-thickness": thickness,
      "--separator-spacing": spacing,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" 
            ? "h-[var(--separator-thickness)] w-full my-[var(--separator-spacing)]" 
            : "h-full w-[var(--separator-thickness)] mx-[var(--separator-spacing)]",
          className
        )}
        style={separatorStyles}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"

export { Separator }
