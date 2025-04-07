"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Check, ChevronRight, Circle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
// Tipos comunes
type ContextMenuItemType = "normal" | "checkbox" | "radio" | "separator" | "label"

// Tipos de estados
type ContextMenuState = {
  open: boolean
  x: number
  y: number
  submenuOpen: Record<string, boolean>
}

// Contexto para el menú contextual
const ContextMenuContext = React.createContext<{
  open: boolean
  x: number
  y: number
  setOpen: (open: boolean) => void
  openContextMenu: (x: number, y: number) => void // Nueva función para abrir el menú con posición
  registerSubmenu: (id: string) => void
  openSubmenu: (id: string, triggerElement?: HTMLElement) => void
  closeSubmenu: (id: string) => void
  isSubmenuOpen: (id: string) => boolean
  closeAllSubmenus: () => void
  activeSubMenuTrigger: React.RefObject<HTMLElement | null> // Añadimos esta referencia
}>({
  open: false,
  x: 0,
  y: 0,
  setOpen: () => {},
  openContextMenu: () => {}, // Valor por defecto
  registerSubmenu: () => {},
  openSubmenu: () => {},
  closeSubmenu: () => {},
  isSubmenuOpen: () => false,
  closeAllSubmenus: () => {},
  activeSubMenuTrigger: { current: null }, // Valor por defecto
})

// Hook para consumir el contexto
const useContextMenu = () => {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("useContextMenu debe usarse dentro de un ContextMenu")
  }
  return context
}

// Contexto para grupos de radio
const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

// Hook para consumir el contexto de radio
const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("useRadioGroup debe usarse dentro de un ContextMenuRadioGroup")
  }
  return context
}

// Componente principal de ContextMenu
interface ContextMenuProps {
  children: React.ReactNode
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [state, setState] = useState<ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
    submenuOpen: {},
  })
  
  const submenuIds = React.useRef<Set<string>>(new Set())
  // Referencia al trigger del submenú activo para posicionamiento
  const activeSubMenuTrigger = React.useRef<HTMLElement | null>(null)
  
  const setOpen = React.useCallback((open: boolean) => {
    setState(prev => ({
      ...prev,
      open,
      submenuOpen: open ? prev.submenuOpen : {},
    }))
  }, [])
  
  const registerSubmenu = React.useCallback((id: string) => {
    submenuIds.current.add(id)
  }, [])
  
  const openSubmenu = React.useCallback((id: string, triggerElement?: HTMLElement) => {
    if (triggerElement) {
      activeSubMenuTrigger.current = triggerElement
    }
    setState(prev => ({
      ...prev,
      submenuOpen: {
        ...prev.submenuOpen,
        [id]: true,
      },
    }))
  }, [])
  
  const closeSubmenu = React.useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      submenuOpen: {
        ...prev.submenuOpen,
        [id]: false,
      },
    }))
  }, [])
  
  const isSubmenuOpen = React.useCallback((id: string) => {
    return !!state.submenuOpen[id]
  }, [state.submenuOpen])
  
  const closeAllSubmenus = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      submenuOpen: {},
    }))
  }, [])
  
  // Nueva función para abrir el menú y establecer su posición
  const openContextMenu = React.useCallback((x: number, y: number) => {
    setState(prev => ({
      ...prev,
      open: true,
      x,
      y,
    }))
  }, [])
  
  // Cerrar el menú cuando se hace clic fuera o se presiona Escape
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (state.open) {
        setOpen(false)
      }
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.open) {
        setOpen(false)
      }
    }
    
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)
    
    return () => {
      document.removeEventListener("click", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [state.open, setOpen])
  
  const contextValue = React.useMemo(() => ({
    open: state.open,
    x: state.x,
    y: state.y,
    setOpen,
    openContextMenu, // Agregamos la nueva función al contexto
    registerSubmenu,
    openSubmenu,
    closeSubmenu,
    isSubmenuOpen,
    closeAllSubmenus,
    activeSubMenuTrigger, // Pasamos la referencia al contexto
  }), [
    state.open, 
    state.x, 
    state.y, 
    setOpen,
    openContextMenu, // Incluimos en las dependencias 
    registerSubmenu, 
    openSubmenu, 
    closeSubmenu, 
    isSubmenuOpen, 
    closeAllSubmenus
  ])
  
  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
    </ContextMenuContext.Provider>
  )
}

// Trigger del ContextMenu
interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, disabled, ...props }, ref) => {
    const { openContextMenu } = useContextMenu() // Usamos la nueva función del contexto
    
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      
      e.preventDefault()
      e.stopPropagation()
      
      // Actualizar la posición y abrir el menú usando la función del contexto
      const { clientX, clientY } = e
      openContextMenu(clientX, clientY)
    }
    
    return (
      <div 
        ref={ref} 
        onContextMenu={handleContextMenu}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

// Contenido del ContextMenu
interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, x, y } = useContextMenu()
    const [position, setPosition] = useState({ x, y })
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    // Mover el useEffect fuera de la condición para mantener consistente el número de hooks
    React.useEffect(() => {
      if (!open || !contentRef.current) return
      
      const rect = contentRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      let newX = x
      let newY = y
      
      if (x + rect.width > viewportWidth) {
        newX = viewportWidth - rect.width - 10
      }
      
      if (y + rect.height > viewportHeight) {
        newY = viewportHeight - rect.height - 10
      }
      
      setPosition({ x: newX, y: newY })
    }, [open, x, y])
    
    // Evitar que se cierre al hacer clic dentro del menú
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
    
    if (!open) return null
    
    return createPortal(
      <div
        ref={ref}
        className={cn(
          "z-50 fixed min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        style={{
          top: position.y,
          left: position.x,
          maxHeight: "calc(100vh - 20px)",
          overflowY: "auto",
        }}
        onClick={handleClick}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>,
      document.body
    )
  }
)
ContextMenuContent.displayName = "ContextMenuContent"

// Grupo de elementos
interface ContextMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        role="group"
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuGroup.displayName = "ContextMenuGroup"

// Item normal del menú
interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
  onSelect?: () => void
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, disabled, children, onSelect, ...props }, ref) => {
    const { setOpen } = useContextMenu()
    
    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return
      
      if (onSelect) {
        e.preventDefault()
        onSelect()
      }
      
      setOpen(false)
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return
      
      if ((e.key === "Enter" || e.key === " ") && onSelect) {
        e.preventDefault()
        onSelect()
        setOpen(false)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuItem.displayName = "ContextMenuItem"

// Item de checkbox
interface ContextMenuCheckboxItemProps extends Omit<ContextMenuItemProps, "onSelect"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, disabled, ...props }, ref) => {
    const { setOpen } = useContextMenu()
    
    const handleSelect = () => {
      if (disabled) return
      onCheckedChange?.(!checked)
      setOpen(false)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled ? "" : undefined}
        onClick={() => handleSelect()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleSelect()
          }
        }}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    )
  }
)
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

// Grupo de radio
interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange])
    
    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={className}
          role="group"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

// Item de radio
interface ContextMenuRadioItemProps extends Omit<ContextMenuItemProps, "onSelect"> {
  value: string
}

const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const { value: groupValue, onValueChange } = useRadioGroup()
    const { setOpen } = useContextMenu()
    const checked = value === groupValue
    
    const handleSelect = () => {
      if (disabled) return
      onValueChange?.(value)
      setOpen(false)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        role="menuitemradio"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled ? "" : undefined}
        onClick={() => handleSelect()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleSelect()
          }
        }}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Circle className="h-4 w-4 fill-current" />}
        </span>
        {children}
      </div>
    )
  }
)
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

// Etiqueta del menú
interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-sm font-semibold text-foreground",
          inset && "pl-8",
          className
        )}
        role="menuitem"
        {...props}
      />
    )
  }
)
ContextMenuLabel.displayName = "ContextMenuLabel"

// Separador
interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-border", className)}
        role="separator"
        {...props}
      />
    )
  }
)
ContextMenuSeparator.displayName = "ContextMenuSeparator"

// Shortcut
interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

// Sub menú
interface ContextMenuSubProps {
  children: React.ReactNode
}

const ContextMenuSub = ({ children }: ContextMenuSubProps) => {
  const id = React.useId()
  const { registerSubmenu } = useContextMenu()
  
  React.useEffect(() => {
    registerSubmenu(id)
  }, [id, registerSubmenu])
  
  return (
    <SubMenuContext.Provider value={{ id }}>
      {children}
    </SubMenuContext.Provider>
  )
}

// Contexto para submenús
const SubMenuContext = React.createContext<{ id: string }>({ id: "" })

// Hook para consumir el contexto de submenú
const useSubMenu = () => {
  const context = React.useContext(SubMenuContext)
  if (!context) {
    throw new Error("useSubMenu debe usarse dentro de un ContextMenuSub")
  }
  return context
}

// Trigger para submenú
interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
}

const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, inset, children, disabled, ...props }, ref) => {
    const { id } = useSubMenu()
    const { openSubmenu, isSubmenuOpen } = useContextMenu()
    const isOpen = isSubmenuOpen(id)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    
    // Función para manejar el clic
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled && triggerRef.current) {
        openSubmenu(id, triggerRef.current)
      }
    }
    
    return (
      <div
        ref={(node) => {
          // Mantener ambas referencias
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          triggerRef.current = node
        }}
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          isOpen && "bg-accent text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        data-submenu-id={id}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick} // Reemplazamos hover por clic
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && triggerRef.current) {
            e.preventDefault()
            openSubmenu(id, triggerRef.current)
          }
        }}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    )
  }
)
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

// Contenido del submenú
interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, children, ...props }, ref) => {
    const { id } = useSubMenu()
    const { isSubmenuOpen, activeSubMenuTrigger } = useContextMenu()
    const isOpen = isSubmenuOpen(id)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    // Calcular y ajustar la posición del submenú
    React.useEffect(() => {
      if (!isOpen || !activeSubMenuTrigger.current) return
      
      const trigger = activeSubMenuTrigger.current
      const rect = trigger.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Posición inicial a la derecha del trigger
      let left = rect.right + 5
      let top = rect.top
      
      // Esperar a que el contenido se renderice para obtener sus dimensiones
      setTimeout(() => {
        if (contentRef.current) {
          const contentRect = contentRef.current.getBoundingClientRect()
          
          // Ajustar horizontalmente si se sale de la pantalla
          if (left + contentRect.width > viewportWidth) {
            left = rect.left - contentRect.width - 5 // Posicionar a la izquierda del trigger
          }
          
          // Ajustar verticalmente si se sale de la pantalla
          if (top + contentRect.height > viewportHeight) {
            top = viewportHeight - contentRect.height - 10
          }
          
          // Actualizar posición
          setPosition({ top, left })
        }
      }, 0)
      
    }, [id, isOpen, activeSubMenuTrigger])
    
    if (!isOpen) return null
    
    return createPortal(
      <div
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
          "animate-in fade-in-0 zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        style={{
          position: "fixed", // Cambiado de absolute a fixed
          top: position.top,
          left: position.left,
        }}
        data-state={isOpen ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>,
      document.body
    )
  }
)
ContextMenuSubContent.displayName = "ContextMenuSubContent"

// No se necesita un Portal explícito ya que lo manejamos en ContextMenuContent
const ContextMenuPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
