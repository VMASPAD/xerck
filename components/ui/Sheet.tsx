"use client"

import React, { useState } from "react";
import { X } from "lucide-react"
import { createPortal } from "react-dom"
import { cn } from "../../lib/utils"
import { Button } from "./button";

// Tipos y contexto
type SheetContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  id: string
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined)

function useSheet() {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("useSheet debe usarse dentro de un Sheet")
  }
  return context
}

// Helpers para las variantes
const sheetVariants = (side: "top" | "right" | "bottom" | "left" = "right") => {
  const baseStyles = "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out"
  
  const sideStyles = {
    // Mejoras en el diseño para el Sheet top
    top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top max-h-[85vh] overflow-y-auto rounded-b-[10px]",
    bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom max-h-96",
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
  }
  
  return `${baseStyles} ${sideStyles[side]}`
}

// Componente principal Sheet
interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

const Sheet = ({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: SheetProps) => {
  // Utilizar defaultOpen para el estado inicial
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const id = React.useId()
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback((value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value)
    }
    onOpenChange?.(value)
  }, [isControlled, onOpenChange])
  
  React.useEffect(() => {
    // Bloquear el scroll del body cuando el sheet está abierto
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [open])
  
  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    id
  }), [open, setOpen, id])
  
  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  )
}
Sheet.displayName = "Sheet"

// Trigger para Sheet
interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, ...props }, ref) => {
    const { setOpen } = useSheet()
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(e)
      }
      setOpen(true)
    }
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetTrigger.displayName = "SheetTrigger"

// Close button para Sheet
interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ children, className, ...props }, ref) => {
    const { setOpen } = useSheet()
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(e)
      }
      // Aseguramos que siempre cierre el Sheet
      setOpen(false)
    }
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetClose.displayName = "SheetClose"

// Portal para Sheet
type SheetPortalProps = {
  children: React.ReactNode
  container?: HTMLElement
}

const SheetPortal = ({ children, container }: SheetPortalProps) => {
  const [mounted, setMounted] = useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(children, container || document.body)
}
SheetPortal.displayName = "SheetPortal"

// Overlay para Sheet
interface SheetOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = useSheet()
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onClick) {
        props.onClick(e)
      }
      // Cerrar el Sheet al hacer click en el overlay
      setOpen(false)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        )}
        onClick={handleClick}
        data-state={open ? "open" : "closed"}
        {...props}
      />
    )
  }
)
SheetOverlay.displayName = "SheetOverlay"

// Content para Sheet
interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const { open, setOpen, id } = useSheet()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [isMounted, setIsMounted] = useState(false)
    
    // Manejar el cierre con la tecla Escape
    React.useEffect(() => {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          setOpen(false)
        }
      }
      
      document.addEventListener("keydown", handleEscapeKey)
      return () => document.removeEventListener("keydown", handleEscapeKey)
    }, [open, setOpen])
    
    // Manejar el focus trap
    React.useEffect(() => {
      if (!open || !contentRef.current) return
      
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
      
      document.addEventListener("keydown", handleTabKey)
      
      // Enfocar el primer elemento al abrir
      setTimeout(() => {
        firstElement?.focus()
      }, 100)
      
      return () => document.removeEventListener("keydown", handleTabKey)
    }, [open])
    
    React.useEffect(() => {
      setIsMounted(true)
      return () => setIsMounted(false)
    }, [])
    
    if (!isMounted) return null
    
    return (
      <SheetPortal>
        <SheetOverlay />
        <div
          ref={mergeRefs(ref, contentRef)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
          className={cn(sheetVariants(side), className)}
          data-state={open ? "open" : "closed"}
          {...props}
        >
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </SheetClose>
          {children}
        </div>
      </SheetPortal>
    )
  }
)
SheetContent.displayName = "SheetContent"

// Header para Sheet
interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  )
)
SheetHeader.displayName = "SheetHeader"

// Footer para Sheet
interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
)
SheetFooter.displayName = "SheetFooter"

// Title para Sheet
interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => {
    const { id } = useSheet()
    return (
      <h2
        ref={ref}
        id={`${id}-title`}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
      />
    )
  }
)
SheetTitle.displayName = "SheetTitle"

// Description para Sheet
interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { id } = useSheet()
    return (
      <p
        ref={ref}
        id={`${id}-description`}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
SheetDescription.displayName = "SheetDescription"

// Utility para combinar refs
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T>).current = value
      }
    })
  }
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
