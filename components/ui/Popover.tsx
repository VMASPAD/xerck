"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../../lib/utils"
import { useState } from "react"
import { Button } from "./button"

// Contexto para el Popover
type PopoverContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLElement>
  contentRef: React.RefObject<HTMLDivElement>
  arrowRef: React.RefObject<HTMLDivElement>
  align: "start" | "center" | "end"
  sideOffset: number
  onOpenChange?: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined)

function usePopover() {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover debe usarse dentro de un Popover")
  }
  return context
}

interface PopoverProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [align, setAlign] = useState<"start" | "center" | "end">("center")
  const [sideOffset, setSideOffset] = useState(4)
  
  const triggerRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const arrowRef = React.useRef<HTMLDivElement>(null)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    if (!isControlled) {
      setUncontrolledOpen(value)
    }
    if (onOpenChange) {
      const newValue = typeof value === "function" ? value(isControlled ? controlledOpen : uncontrolledOpen) : value
      onOpenChange(newValue)
    }
  }, [isControlled, controlledOpen, uncontrolledOpen, onOpenChange])

  // Cerrar popover al hacer clic fuera o presionar escape
  React.useEffect(() => {
    if (!open) return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      const triggerEl = triggerRef.current
      const contentEl = contentRef.current

      if (
        !triggerEl?.contains(target) && 
        !contentEl?.contains(target)
      ) {
        setOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [open, setOpen])
  
  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    triggerRef,
    contentRef,
    arrowRef,
    align,
    sideOffset,
    onOpenChange,
  }), [
    open,
    setOpen,
    align,
    sideOffset,
    onOpenChange
  ])
  
  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  )
}

Popover.displayName = "Popover"

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, children, ...props }, forwardedRef) => {
    const { setOpen, triggerRef, open } = usePopover()
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          triggerRef.current = node
          
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    const handleClick = (e: React.MouseEvent) => {
      if (props.onClick) {
        props.onClick(e)
      }
      setOpen(!open)
    }
    
    // Si asChild es true, clonamos el elemento hijo 
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        onClick: handleClick,
        "data-state": open ? "open" : "closed",
        ...props,
        ...children.props,
      } as any)
    }
    
    return (
      <Button
        ref={ref}
        type="button"
        onClick={handleClick}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverAnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ asChild, children, ...props }, forwardedRef) => {
    const { triggerRef } = usePopover()
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          triggerRef.current = node
          
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    // Si asChild es true, clonamos el elemento hijo
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        ...props,
        ...children.props,
      } as any)
    }
    
    return (
      <div
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverAnchor.displayName = "PopoverAnchor"

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  avoidCollisions?: boolean
  hideWhenDetached?: boolean
  forceMount?: boolean
  showArrow?: boolean
  arrowClassName?: string
  side?: "top" | "right" | "bottom" | "left"
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ 
    className, 
    children, 
    align = "center", 
    sideOffset = 4, 
    alignOffset = 0,
    forceMount,
    showArrow = false,
    arrowClassName,
    side = "bottom",
    ...props 
  }, forwardedRef) => {
    const { open, contentRef, triggerRef, arrowRef } = usePopover()
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 })
    const [mounted, setMounted] = useState(false)
    
    // Calcular posición del popover según alineación y offset
    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return
      
      // Obtener dimensiones y posición del trigger y contenido
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      const { scrollX, scrollY } = window
      
      let top = 0
      let left = 0
      
      // Calcular la posición según el "side" (lado)
      switch (side) {
        case "bottom":
          top = triggerRect.bottom + sideOffset
          
          // Alineación horizontal
          if (align === "center") {
            left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + alignOffset
          } else if (align === "start") {
            left = triggerRect.left + alignOffset
          } else if (align === "end") {
            left = triggerRect.right - contentRect.width + alignOffset
          }
          break
          
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset
          
          // Alineación horizontal
          if (align === "center") {
            left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + alignOffset
          } else if (align === "start") {
            left = triggerRect.left + alignOffset
          } else if (align === "end") {
            left = triggerRect.right - contentRect.width + alignOffset
          }
          break
          
        case "left":
          left = triggerRect.left - contentRect.width - sideOffset
          
          // Alineación vertical
          if (align === "center") {
            top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2) + alignOffset
          } else if (align === "start") {
            top = triggerRect.top + alignOffset
          } else if (align === "end") {
            top = triggerRect.bottom - contentRect.height + alignOffset
          }
          break
          
        case "right":
          left = triggerRect.right + sideOffset
          
          // Alineación vertical
          if (align === "center") {
            top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2) + alignOffset
          } else if (align === "start") {
            top = triggerRect.top + alignOffset
          } else if (align === "end") {
            top = triggerRect.bottom - contentRect.height + alignOffset
          }
          break
      }
      
      // Evitar que el popover salga del viewport
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Ajuste horizontal
      if (left < 10) {
        left = 10
      } else if (left + contentRect.width > viewportWidth - 10) {
        left = viewportWidth - contentRect.width - 10
      }
      
      // Ajuste vertical
      if (top < 10) {
        top = 10
      } else if (top + contentRect.height > viewportHeight - 10) {
        top = viewportHeight - contentRect.height - 10
      }
      
      setPosition({ 
        top: top + scrollY,
        left: left + scrollX
      })
      
      // Calcular posición de la flecha si está habilitada
      if (showArrow && arrowRef.current) {
        let arrowTop = 0
        let arrowLeft = 0
        
        const arrowSize = 8 // Tamaño de la flecha en px
        
        switch (side) {
          case "bottom":
            arrowTop = -arrowSize
            arrowLeft = triggerRect.left + (triggerRect.width / 2) - left
            break
          case "top":
            arrowTop = contentRect.height
            arrowLeft = triggerRect.left + (triggerRect.width / 2) - left
            break
          case "left":
            arrowTop = triggerRect.top + (triggerRect.height / 2) - top
            arrowLeft = contentRect.width
            break
          case "right":
            arrowTop = triggerRect.top + (triggerRect.height / 2) - top
            arrowLeft = -arrowSize
            break
        }
        
        setArrowPosition({ top: arrowTop, left: arrowLeft })
      }
    }, [triggerRef, contentRef, arrowRef, side, align, sideOffset, alignOffset, showArrow])
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          contentRef.current = node
          
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, contentRef]
    )
    
    // Efecto para montar el componente
    React.useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])
    
    // Efecto para actualizar posición
    React.useEffect(() => {
      if (!open || !mounted) return
      
      updatePosition()
      
      // Actualizar posición si cambia el tamaño de la ventana
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
      
      // Actualizar posición periódicamente para casos como animaciones o cambios
      const intervalId = setInterval(updatePosition, 200)
      
      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition)
        clearInterval(intervalId)
      }
    }, [open, mounted, updatePosition])
    
    if (!mounted || (!open && !forceMount)) return null
    
    const sideToTransformOriginMap = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }
    
    const transformOrigin = sideToTransformOriginMap[side]
    
    const content = (
      <div
        ref={ref}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex: 50,
          width: "max-content",
          maxWidth: "calc(100vw - 20px)",
          transformOrigin: transformOrigin,
          opacity: open ? 1 : 0,
          transform: `scale(${open ? 1 : 0.95})`,
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        data-state={open ? "open" : "closed"}
        data-side={side}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <div
            ref={arrowRef}
            className={cn(
              "absolute rotate-45 w-2 h-2 bg-popover border",
              side === "bottom" ? "border-t border-l" : "",
              side === "top" ? "border-b border-r" : "",
              side === "left" ? "border-r border-b" : "",
              side === "right" ? "border-l border-t" : "",
              arrowClassName
            )}
            style={{
              top: arrowPosition.top,
              left: arrowPosition.left,
              // Ajustar los bordes según el lado
              borderTopColor: side === "bottom" ? "inherit" : "transparent",
              borderRightColor: side === "left" ? "inherit" : "transparent",
              borderBottomColor: side === "top" ? "inherit" : "transparent",
              borderLeftColor: side === "right" ? "inherit" : "transparent",
            }}
          />
        )}
      </div>
    )
    
    return createPortal(content, document.body)
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
