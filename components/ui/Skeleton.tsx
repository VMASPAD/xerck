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

    // Estilos CSS para animaciones personalizadas
    const pulseAnimation = {
      animation: pulse ? 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
    }

    const shimmerStyles = shimmer ? {
      position: 'relative',
      overflow: 'hidden',
    } : {}

    // Estilos para el pseudo-elemento before que crea la animación shimmer
    const shimmerBeforeStyles = shimmer ? {
      '--tw-content': '""',
      content: 'var(--tw-content)',
      position: 'absolute',
      inset: '0',
      transform: 'translateX(-100%)',
      borderRadius: 'inherit',
      background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
      animation: 'shimmer 4s ease-in-out infinite'
    } : {}

    return (
      <div
        ref={ref}
        style={{
          ...pulseAnimation,
          ...shimmerStyles,
          ...(Object.keys(shimmerBeforeStyles).length > 0 ? { '--before-styles': JSON.stringify(shimmerBeforeStyles) } : {})
        }}
        className={cn(
          "bg-muted animate-in fade-in-5",
          radiusClasses[radius],
          shimmer && "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          shimmer && "[&::before]:animate-[shimmer_4s_ease-in-out_infinite]",
          shimmer && "relative overflow-hidden",
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

// Estilo global que define las animaciones necesarias
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      50%, 100% {
        transform: translateX(100%);
      }
    }
  `}</style>
);

export { Skeleton, GlobalStyles }
