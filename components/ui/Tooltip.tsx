"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../lib/utils"
import { useState } from "react"

// Contexto para el Tooltip
type TooltipContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLElement>
  contentId: string
  defaultOpen?: boolean
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  onOpenChange?: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined)

const useTooltip = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("useTooltip debe usarse dentro de un Tooltip")
  }
  return context
}

// Proveedor de Tooltip
interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

const TooltipProvider = ({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}: TooltipProviderProps) => {
  const tooltipOptions = React.useMemo(
    () => ({ delayDuration, skipDelayDuration, disableHoverableContent }),
    [delayDuration, skipDelayDuration, disableHoverableContent]
  )

  return (
    <TooltipProviderContext.Provider value={tooltipOptions}>
      {children}
    </TooltipProviderContext.Provider>
  )
}

// Contexto del proveedor
type TooltipProviderContextType = {
  delayDuration: number
  skipDelayDuration: number
  disableHoverableContent: boolean
}

const TooltipProviderContext = React.createContext<TooltipProviderContextType>({
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
})

const useTooltipProvider = () => {
  return React.useContext(TooltipProviderContext)
}

// Componente principal Tooltip
interface TooltipProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  disableHoverableContent?: boolean
}

const Tooltip = ({
  children,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  delayDuration: delayDurationProp,
  disableHoverableContent: disableHoverableContentProp,
}: TooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen || false)
  const triggerRef = React.useRef<HTMLElement>(null)
  const contentId = React.useId()
  
  // Obtener opciones del proveedor
  const {
    delayDuration: delayDurationContext,
    disableHoverableContent: disableHoverableContentContext,
  } = useTooltipProvider()
  
  // Determinar si es controlado o no
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  
  // Fusionar opciones
  const delayDuration = delayDurationProp ?? delayDurationContext
  const disableHoverableContent = disableHoverableContentProp ?? disableHoverableContentContext
  
  // Manejar cambios de estado
  const setOpen = React.useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => {
      const newValue = typeof value === "function" 
        ? value(isControlled ? controlledOpen! : uncontrolledOpen) 
        : value
      
      if (!isControlled) {
        setUncontrolledOpen(newValue)
      }
      
      onOpenChange?.(newValue)
    },
    [isControlled, controlledOpen, uncontrolledOpen, onOpenChange]
  )
  
  // Proporcionar contexto a los componentes hijos
  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentId,
      defaultOpen,
      delayDuration,
      disableHoverableContent,
      onOpenChange,
    }),
    [
      open,
      setOpen,
      contentId,
      defaultOpen,
      delayDuration,
      disableHoverableContent,
      onOpenChange,
    ]
  )
  
  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  )
}

// Trigger para el Tooltip
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild, children, ...props }, forwardedRef) => {
    const { setOpen, triggerRef, open, contentId, delayDuration } = useTooltip()
    
    // Referencia combinada
    const ref = React.useCallback(
      (node: HTMLElement | null) => {
        if (node) {
          triggerRef.current = node
          
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    // Temporizadores
    const showTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    
    // Gestor de apertura con retraso
    const handleShowTooltip = React.useCallback(() => {
      clearTimeout(hideTimeoutRef.current as NodeJS.Timeout)
      
      if (!open) {
        showTimeoutRef.current = setTimeout(() => {
          setOpen(true)
        }, delayDuration)
      }
    }, [open, setOpen, delayDuration])
    
    // Gestor de cierre
    const handleHideTooltip = React.useCallback(() => {
      clearTimeout(showTimeoutRef.current as NodeJS.Timeout)
      
      hideTimeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 100) // Pequeño retraso para permitir moverse al contenido
    }, [setOpen])
    
    // Limpiar los temporizadores al desmontar
    React.useEffect(() => {
      return () => {
        clearTimeout(showTimeoutRef.current as NodeJS.Timeout)
        clearTimeout(hideTimeoutRef.current as NodeJS.Timeout)
      }
    }, [])
    
    // Si asChild es true, clonamos el elemento hijo
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        "aria-describedby": open ? contentId : undefined,
        onMouseEnter: composeEventHandlers(
          (children.props as any).onMouseEnter,
          handleShowTooltip
        ),
        onMouseLeave: composeEventHandlers(
          (children.props as any).onMouseLeave,
          handleHideTooltip
        ),
        onFocus: composeEventHandlers(
          (children.props as any).onFocus,
          handleShowTooltip
        ),
        onBlur: composeEventHandlers(
          (children.props as any).onBlur,
          handleHideTooltip
        ),
      } as any)
    }
    
    return (
      <span
        ref={ref}
        aria-describedby={open ? contentId : undefined}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        onFocus={handleShowTooltip}
        onBlur={handleHideTooltip}
        {...props}
      >
        {children}
      </span>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

// Portal para el contenido
const TooltipPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(children, document.body)
}

// Contenido del Tooltip
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
  arrowPadding?: number
  sticky?: "partial" | "always"
  hideWhenDetached?: boolean
  forceMount?: boolean
  showArrow?: boolean
  arrowClassName?: string
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ 
    className, 
    children, 
    side = "top", 
    align = "center", 
    sideOffset = 4, 
    alignOffset = 0, 
    avoidCollisions = true, 
    collisionPadding = 8, 
    arrowPadding = 4, 
    sticky = "partial", 
    hideWhenDetached = false, 
    forceMount, 
    showArrow = false,
    arrowClassName,
    ...props 
  }, ref) => {
    const { open, setOpen, triggerRef, contentId, disableHoverableContent } = useTooltip()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const arrowRef = React.useRef<HTMLDivElement>(null)
    
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 })
    const [computedSide, setComputedSide] = useState(side)
    const [computedAlign, setComputedAlign] = useState(align)
    
    // Calcular colisión y padding
    const padding = React.useMemo(() => {
      if (typeof collisionPadding === "number") {
        return {
          top: collisionPadding,
          right: collisionPadding,
          bottom: collisionPadding,
          left: collisionPadding,
        }
      }
      return {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
        ...collisionPadding,
      }
    }, [collisionPadding])
    
    // Actualizar posición del tooltip
    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return
      
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Calcular posición inicial basada en side y align
      let x = 0
      let y = 0
      let finalSide = side
      let finalAlign = align
      
      // Posición basada en el lado (side)
      switch (side) {
        case "top":
          y = triggerRect.top - contentRect.height - sideOffset
          break
        case "bottom":
          y = triggerRect.bottom + sideOffset
          break
        case "left":
          x = triggerRect.left - contentRect.width - sideOffset
          break
        case "right":
          x = triggerRect.right + sideOffset
          break
      }
      
      // Alineación
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            x = triggerRect.left + alignOffset
            break
          case "center":
            x = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + alignOffset
            break
          case "end":
            x = triggerRect.right - contentRect.width - alignOffset
            break
        }
      } else {
        switch (align) {
          case "start":
            y = triggerRect.top + alignOffset
            break
          case "center":
            y = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2) + alignOffset
            break
          case "end":
            y = triggerRect.bottom - contentRect.height - alignOffset
            break
        }
      }
      
      // Evitar colisiones si está habilitado
      if (avoidCollisions) {
        // Colisión con el borde superior
        if (y < padding.top) {
          if (side === "top") {
            y = triggerRect.bottom + sideOffset // Cambiar a bottom
            finalSide = "bottom"
          } else {
            y = padding.top // Ajustar dentro del viewport
          }
        }
        
        // Colisión con el borde inferior
        if (y + contentRect.height > viewportHeight - padding.bottom) {
          if (side === "bottom") {
            y = triggerRect.top - contentRect.height - sideOffset // Cambiar a top
            finalSide = "top"
          } else {
            y = viewportHeight - contentRect.height - padding.bottom // Ajustar dentro del viewport
          }
        }
        
        // Colisión con el borde izquierdo
        if (x < padding.left) {
          if (side === "left") {
            x = triggerRect.right + sideOffset // Cambiar a right
            finalSide = "right"
          } else {
            x = padding.left // Ajustar dentro del viewport
            finalAlign = "start"
          }
        }
        
        // Colisión con el borde derecho
        if (x + contentRect.width > viewportWidth - padding.right) {
          if (side === "right") {
            x = triggerRect.left - contentRect.width - sideOffset // Cambiar a left
            finalSide = "left"
          } else {
            x = viewportWidth - contentRect.width - padding.right // Ajustar dentro del viewport
            finalAlign = "end"
          }
        }
      }
      
      // Actualizar la posición y side/align calculados
      setPosition({ x: x + window.scrollX, y: y + window.scrollY })
      setComputedSide(finalSide)
      setComputedAlign(finalAlign)
      
      // Si se muestra la flecha, calcular su posición
      if (showArrow && arrowRef.current) {
        let arrowX = 0
        let arrowY = 0
        
        const arrowSize = 8 // Tamaño de la flecha
        
        switch (finalSide) {
          case "top":
            arrowY = contentRect.height
            arrowX = finalAlign === "start" 
              ? arrowPadding + arrowSize
              : finalAlign === "end"
                ? contentRect.width - arrowPadding - arrowSize
                : contentRect.width / 2
            break
          case "bottom":
            arrowY = -arrowSize * 2
            arrowX = finalAlign === "start" 
              ? arrowPadding + arrowSize
              : finalAlign === "end"
                ? contentRect.width - arrowPadding - arrowSize
                : contentRect.width / 2
            break
          case "left":
            arrowX = contentRect.width
            arrowY = finalAlign === "start" 
              ? arrowPadding + arrowSize
              : finalAlign === "end"
                ? contentRect.height - arrowPadding - arrowSize
                : contentRect.height / 2
            break
          case "right":
            arrowX = -arrowSize * 2
            arrowY = finalAlign === "start" 
              ? arrowPadding + arrowSize
              : finalAlign === "end"
                ? contentRect.height - arrowPadding - arrowSize
                : contentRect.height / 2
            break
        }
        
        setArrowPosition({ x: arrowX, y: arrowY })
      }
    }, [
      triggerRef, align, alignOffset, avoidCollisions, padding, side, sideOffset, showArrow, arrowPadding
    ])
    
    // Temporizador para ocultar
    const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    
    // Manejadores de eventos
    const handleMouseEnter = () => {
      if (disableHoverableContent) return
      clearTimeout(hideTimeoutRef.current as NodeJS.Timeout)
    }
    
    const handleMouseLeave = () => {
      if (disableHoverableContent) return
      hideTimeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 100)
    }
    
    // Actualizar posición cuando cambie el tamaño de la ventana
    React.useEffect(() => {
      if (!open) return
      
      updatePosition()
      
      window.addEventListener("resize", updatePosition)
      window.addEventListener("scroll", updatePosition)
      
      return () => {
        window.removeEventListener("resize", updatePosition)
        window.removeEventListener("scroll", updatePosition)
      }
    }, [open, updatePosition])
    
    // Limpiar temporizadores al desmontar
    React.useEffect(() => {
      return () => {
        clearTimeout(hideTimeoutRef.current as NodeJS.Timeout)
      }
    }, [])
    
    if (!open && !forceMount) return null
    
    return (
      <TooltipPortal>
        <div
          ref={mergeRefs(ref, contentRef)}
          id={contentId}
          role="tooltip"
          className={cn(
            "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            transformOrigin: getTransformOrigin(computedSide, computedAlign),
            ...getDataAttributes(computedSide, computedAlign),
          }}
          data-state={open ? "open" : "closed"}
          data-side={computedSide}
          data-align={computedAlign}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
          
          {showArrow && (
            <div
              ref={arrowRef}
              className={cn(
                "absolute w-2 h-2 bg-primary rotate-45",
                arrowClassName
              )}
              style={{
                left: arrowPosition.x,
                top: arrowPosition.y,
              }}
              data-arrow
            />
          )}
        </div>
      </TooltipPortal>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

// Función auxiliar para combinar refs
function mergeRefs<T = any>(...refs: React.Ref<T>[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value
      }
    })
  }
}

// Función auxiliar para combinar manejadores de eventos
function composeEventHandlers<E>(
  originalHandler: ((event: E) => void) | undefined,
  ourHandler: (event: E) => void
) {
  return (event: E) => {
    originalHandler?.(event)
    ourHandler(event)
  }
}

// Determinar el origen de la transformación según side y align
function getTransformOrigin(side: string, align: string) {
  const sides = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }
  
  const alignments = {
    start: side === "top" || side === "bottom" ? "left" : "top",
    center: "center",
    end: side === "top" || side === "bottom" ? "right" : "bottom",
  }
  
  return `${alignments[align as keyof typeof alignments]} ${sides[side as keyof typeof sides]}`
}

// Crear atributos de datos para los estilos CSS
function getDataAttributes(side: string, align: string) {
  return {
    "data-side": side,
    "data-align": align,
  }
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
