"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
// Implementación básica de CVA (class-variance-authority) para los estilos de label
const labelVariants = (className?: string) => {
  return cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * El elemento a renderizar como etiqueta. Útil para integración con componentes de formulario.
   */
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, asChild, children, ...props }, ref) => {
    // Si asChild es true y children es un elemento React válido, clonar ese elemento
    // con las props del Label
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        className: cn(labelVariants(className), children.props.className),
      })
    }

    return (
      <label
        ref={ref}
        className={labelVariants(className)}
        {...props}
      >
        {children}
      </label>
    )
  }
)
Label.displayName = "Label"

export { Label }
