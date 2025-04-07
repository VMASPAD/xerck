"use client"

import React, { useState } from "react";
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
// Contexto para el HoverCard
type HoverCardContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const HoverCardContext = React.createContext<HoverCardContextType>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error("useHoverCard debe usarse dentro de un HoverCard")
  }
  return context
}

// Propiedades para el componente raíz
interface HoverCardProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
}

const HoverCard = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300
}: HoverCardProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement>(null)
  const openTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback((value: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(value)
    }
    onOpenChange?.(value)
  }, [controlledOpen, onOpenChange])
  
  // Manejar los temporizadores para abrir y cerrar
  const handleOpen = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    
    if (!open) {
      openTimerRef.current = setTimeout(() => {
        setOpen(true)
      }, openDelay)
    }
  }, [open, openDelay, setOpen])
  
  const handleClose = React.useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    
    if (open) {
      closeTimerRef.current = setTimeout(() => {
        setOpen(false)
      }, closeDelay)
    }
  }, [open, closeDelay, setOpen])
  
  // Limpiar temporizadores al desmontar
  React.useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])
  
  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    triggerRef,
    handleOpen,
    handleClose,
  }), [open, setOpen, handleOpen, handleClose])
  
  return (
    <HoverCardContext.Provider value={contextValue}>
      {children}
    </HoverCardContext.Provider>
  )
}

// Trigger del HoverCard
interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children, asChild, ...props }, forwardedRef) => {
    const { triggerRef, handleOpen, handleClose } = useHoverCard() as HoverCardContextType & {
      handleOpen: () => void
      handleClose: () => void
    }
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLElement | null) => {
        if (node) {
          // Actualizar el ref de trigger en el contexto
          if (triggerRef) {
            (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
          }
          
          // Actualizar el ref externo
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    const triggerProps = {
      ref,
      onMouseEnter: (e: React.MouseEvent) => {
        props.onMouseEnter?.(e)
        handleOpen()
      },
      onMouseLeave: (e: React.MouseEvent) => {
        props.onMouseLeave?.(e)
        handleClose()
      },
      onFocus: (e: React.FocusEvent) => {
        props.onFocus?.(e)
        handleOpen()
      },
      onBlur: (e: React.FocusEvent) => {
        props.onBlur?.(e)
        handleClose()
      },
      ...props
    }
    
    // Si asChild es true, clonar el hijo y agregar props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, triggerProps as any)
    }
    
    return (
      <span {...triggerProps}>
        {children}
      </span>
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

// Contenido del HoverCard
interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  side?: "top" | "bottom" | "left" | "right"
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ 
    className, 
    children, 
    align = "center", 
    sideOffset = 4, 
    alignOffset = 0, 
    side = "bottom",
    ...props 
  }, ref) => {
    const { open, triggerRef, handleOpen, handleClose } = useHoverCard() as HoverCardContextType & {
      handleOpen: () => void
      handleClose: () => void
    }
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [mounted, setMounted] = useState(false)
    
    React.useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])
    
    // Calcular la posición del contenido
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current || !mounted) return
      
      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect()
        const contentRect = contentRef.current?.getBoundingClientRect()
        
        if (!triggerRect || !contentRect) return
        
        let top = 0
        let left = 0
        
        // Posicionamiento vertical
        switch (side) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset
            break
          case "bottom":
          default:
            top = triggerRect.bottom + sideOffset
            break
          case "left":
            top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2)
            left = triggerRect.left - contentRect.width - sideOffset
            break
          case "right":
            top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2)
            left = triggerRect.right + sideOffset
            break
        }
        
        // Alineación horizontal para top y bottom
        if (side === "top" || side === "bottom") {
          switch (align) {
            case "start":
              left = triggerRect.left + alignOffset
              break
            case "center":
              left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + alignOffset
              break
            case "end":
              left = triggerRect.right - contentRect.width + alignOffset
              break
          }
        }
        
        // Ajustar si sale de la pantalla
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        if (left < 10) {
          left = 10
        } else if (left + contentRect.width > viewportWidth - 10) {
          left = viewportWidth - contentRect.width - 10
        }
        
        if (top < 10) {
          top = 10
        } else if (top + contentRect.height > viewportHeight - 10) {
          top = viewportHeight - contentRect.height - 10
        }
        
        // Ajustar por el scroll
        top += window.scrollY
        left += window.scrollX
        
        setPosition({ top, left })
      }
      
      updatePosition()
      
      // Actualizar posición al resize
      window.addEventListener('resize', updatePosition)
      return () => window.removeEventListener('resize', updatePosition)
    }, [open, triggerRef, sideOffset, align, alignOffset, side, mounted])
    
    if (!mounted || !open) return null
    
    return createPortal(
      <div
        ref={mergeRefs(ref, contentRef)}
        className={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        data-state={open ? "open" : "closed"}
        data-side={side}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...props}
      >
        {children}
      </div>,
      document.body
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

// Utilidad para combinar refs
function mergeRefs<T = any>(...refs: React.Ref<T>[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value
      }
    })
  }
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
