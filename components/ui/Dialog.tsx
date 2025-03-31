"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// Contexto para el Dialog
const DialogContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  onOpenChange?: (open: boolean) => void
  closeDialog: () => void // Nuevo método para cerrar el diálogo desde componentes hijos
}>({
  open: false,
  setOpen: () => {},
  closeDialog: () => {} // Valor por defecto para el nuevo método
})

// Hook para consumir el contexto
const useDialogContext = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialogContext debe usarse dentro de un Dialog")
  }
  return context
}

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnOutsideClick?: boolean // Nueva propiedad para controlar si se cierra al hacer clic fuera
}

const Dialog = ({ 
  children, 
  open: controlledOpen, 
  defaultOpen = false, 
  onOpenChange,
  closeOnOutsideClick = true // Por defecto se cierra al hacer clic fuera
}: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback((value: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(value)
    }
    onOpenChange?.(value)
  }, [controlledOpen, onOpenChange])
  
  // Método específico para cerrar el diálogo
  const closeDialog = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])
  
  // Manejar la tecla ESC para cerrar el diálogo
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, setOpen])
  
  return (
    <DialogContext.Provider value={{ open, setOpen, onOpenChange, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean // Propiedad para usar un componente hijo como trigger
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const { setOpen } = useDialogContext()
    
    // Si asChild es true, clonar el hijo y pasarle las props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e)
          setOpen(true)
        },
      })
    }
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={() => setOpen(true)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

// Portal para renderizar el diálogo fuera de la jerarquía del DOM
const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(children, document.body)
}

// Botón de cierre personalizable
interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean // Propiedad para usar un componente hijo como botón de cierre
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, asChild, ...props }, ref) => {
    const { closeDialog } = useDialogContext()
    
    // Si asChild es true, clonar el hijo y pasarle las props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e)
          closeDialog()
        },
      })
    }
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={closeDialog}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogClose.displayName = "DialogClose"

// Fondo semi-transparente detrás del diálogo
interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = useDialogContext()
    
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/80 transition-all duration-300",
          open 
            ? "opacity-100 backdrop-blur-sm" 
            : "opacity-0 pointer-events-none backdrop-blur-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        )}
        data-state={open ? "open" : "closed"}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

// Contenido principal del diálogo
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, closeDialog } = useDialogContext()
    const { closeOnOutsideClick } = React.useContext(DialogContext) as { closeOnOutsideClick?: boolean }
    
    // Detener la propagación de clics para no cerrar al hacer clic dentro del diálogo
    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
    
    // Manejar el clic en el overlay para cerrar el diálogo si closeOnOutsideClick es true
    const handleOverlayClick = () => {
      if (closeOnOutsideClick !== false) {
        closeDialog()
      }
    }
    
    // Crear un estado para controlar la animación de salida
    const [isAnimating, setIsAnimating] = useState(false)
    
    // Detectar cambios en el estado de apertura para animar
    React.useEffect(() => {
      if (!open) {
        setIsAnimating(true)
        const timer = setTimeout(() => setIsAnimating(false), 300) // Duración de la animación
        return () => clearTimeout(timer)
      }
    }, [open])
    
    if (!open && !isAnimating) return null
    
    return (
      <DialogPortal>
        <div onClick={handleOverlayClick}>
          <DialogOverlay />
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg",
              "transition-all duration-300 ease-in-out transform",
              open ? "scale-100 opacity-100" : "scale-95 opacity-0",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
              "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
              "sm:rounded-lg",
              className
            )}
            data-state={open ? "open" : "closed"}
            onClick={handleContentClick}
            {...props}
          >
            {children}
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

// Componentes auxiliares para la estructura del diálogo
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
