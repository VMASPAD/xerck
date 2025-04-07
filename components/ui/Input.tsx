"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Renderiza un contenedor adicional alrededor del input
   */
  wrapperClassName?: string;
  /**
   * Elemento a renderizar antes del input
   */
  prefix?: React.ReactNode;
  /**
   * Elemento a renderizar después del input
   */
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, wrapperClassName, prefix, suffix, ...props }, ref) => {
    // Si tenemos prefix o suffix, renderizar con un wrapper
    if (prefix || suffix) {
      return (
        <div 
          className={cn(
            "flex h-9 w-full items-center rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring",
            wrapperClassName
          )}
        >
          {prefix && <div className="mr-2 flex items-center">{prefix}</div>}
          <input
            type={type}
            className={cn(
              "flex w-full bg-transparent px-0 py-0 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "border-0 shadow-none focus-visible:ring-0", // Quitar estilos duplicados
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && <div className="ml-2 flex items-center">{suffix}</div>}
        </div>
      )
    }

    // Caso normal sin prefix/suffix
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
