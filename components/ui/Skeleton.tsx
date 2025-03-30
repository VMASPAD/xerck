"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Propiedades para el componente Skeleton
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animación de pulso que se aplica al esqueleto
   * @default true
   */
  pulse?: boolean

  /**
   * Animación de brillo que se aplica al esqueleto
   * @default false
   */
  shimmer?: boolean

  /**
   * Radio de borde del esqueleto
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | "full"
}

/**
 * Componente Skeleton
 * 
 * Un componente de esqueleto para usar como marcador de posición mientras se carga el contenido.
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    pulse = true, 
    shimmer = false, 
    radius = "md",
    ...props 
  }, ref) => {
    // Mapeo de valores de radius a clases de Tailwind
    const radiusClasses = {
      "none": "rounded-none",
      "sm": "rounded-sm",
      "md": "rounded-md",
      "lg": "rounded-lg",
      "full": "rounded-full"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-muted animate-in fade-in-5",
          radiusClasses[radius],
          pulse && "animate-pulse",
          shimmer && "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_2s_infinite]",
          shimmer && "relative overflow-hidden",
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
