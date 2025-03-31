"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Check, ChevronRight, Circle } from "lucide-react"

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// Contexto para el DropdownMenu
type DropdownMenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  subMenus: Map<string, { open: boolean }>
  openSubMenu: (id: string) => void
  closeSubMenu: (id: string) => void
  isSubMenuOpen: (id: string) => boolean
  activeItem: number
  setActiveItem: (index: number) => void
  registerItem: (id: string) => void
  itemCount: number
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  subMenus: new Map(),
  openSubMenu: () => {},
  closeSubMenu: () => {},
  isSubMenuOpen: () => false,
  activeItem: -1,
  setActiveItem: () => {},
  registerItem: () => {},
  itemCount: 0,
})

const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("useDropdownMenu debe usarse dentro de un DropdownMenu")
  }
  return context
}

// Contexto para radio groups
type RadioGroupContextType = {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextType>({})

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("useRadioGroup debe usarse dentro de un DropdownMenuRadioGroup")
  }
  return context
}

// Componente DropdownMenu
interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [subMenus, setSubMenus] = useState<Map<string, { open: boolean }>>(new Map())
  const [activeItem, setActiveItem] = useState(-1)
  const [itemCount, setItemCount] = useState(0)
  
  const triggerRef = React.useRef<HTMLElement>(null)
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback((value: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(value)
    }
    onOpenChange?.(value)
    
    // Reset active item when closing
    if (!value) {
      setActiveItem(-1)
    }
  }, [controlledOpen, onOpenChange])
  
  const openSubMenu = React.useCallback((id: string) => {
    setSubMenus(prev => {
      const newMap = new Map(prev)
      newMap.set(id, { open: true })
      return newMap
    })
  }, [])
  
  const closeSubMenu = React.useCallback((id: string) => {
    setSubMenus(prev => {
      const newMap = new Map(prev)
      newMap.set(id, { open: false })
      return newMap
    })
  }, [])
  
  const isSubMenuOpen = React.useCallback((id: string) => {
    return !!subMenus.get(id)?.open
  }, [subMenus])
  
  const registerItem = React.useCallback((id: string) => {
    setItemCount(prev => prev + 1)
    return () => setItemCount(prev => prev - 1)
  }, [])
  
  // Manejar la navegación con teclado
  React.useEffect(() => {
    if (!open) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveItem(prev => (prev + 1) % itemCount)
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveItem(prev => (prev - 1 + itemCount) % itemCount)
          break
        case "Escape":
          e.preventDefault()
          setOpen(false)
          break
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, itemCount, setOpen])
  
  // Cerrar al hacer clic fuera
  React.useEffect(() => {
    if (!open) return
    
    const handleOutsideClick = (e: MouseEvent) => {
      // No cerrar si el clic fue en el trigger o dentro del menú
      if (
        triggerRef.current?.contains(e.target as Node) ||
        e.target instanceof Node && 
        document.querySelector("[data-dropdown-content]")?.contains(e.target)
      ) {
        return
      }
      
      setOpen(false)
    }
    
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [open, setOpen])
  
  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    triggerRef,
    subMenus,
    openSubMenu,
    closeSubMenu,
    isSubMenuOpen,
    activeItem,
    setActiveItem,
    registerItem,
    itemCount,
  }), [
    open, 
    setOpen, 
    subMenus, 
    openSubMenu, 
    closeSubMenu, 
    isSubMenuOpen, 
    activeItem, 
    setActiveItem,
    registerItem,
    itemCount,
  ])
  
  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

// Trigger del DropdownMenu
interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild, ...props }, forwardedRef) => {
    const { setOpen, open, triggerRef } = useDropdownMenu()
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          // Actualizar el ref de trigger en el contexto
          if (triggerRef) {
            (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
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
    
    // Manejar el clic en el trigger
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setOpen(!open)
    }
    
    // Si asChild es true, clonar el hijo y agregar props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        onClick: (e: React.MouseEvent) => {
          handleClick(e)
          children.props.onClick?.(e)
        },
        "aria-expanded": open,
        "aria-haspopup": true,
        ...props,
      })
    }
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup={true}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

// Portal
const DropdownMenuPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(children, document.body)
}
DropdownMenuPortal.displayName = "DropdownMenuPortal"

// Contenido del DropdownMenu
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, align = "center", alignOffset = 0, ...props }, ref) => {
    const { open, triggerRef } = useDropdownMenu()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    // Calcular la posición del menú
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return
      
      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect()
        const contentRect = contentRef.current?.getBoundingClientRect()
        
        if (!triggerRect || !contentRect) return
        
        let top = triggerRect.bottom + sideOffset + window.scrollY
        let left = 0
        
        // Alineación horizontal
        switch (align) {
          case "start":
            left = triggerRect.left + alignOffset + window.scrollX
            break
          case "center":
            left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + alignOffset + window.scrollX
            break
          case "end":
            left = triggerRect.right - contentRect.width + alignOffset + window.scrollX
            break
        }
        
        // Ajustar si sale de la pantalla
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        if (left < 0) {
          left = 0
        } else if (left + contentRect.width > viewportWidth) {
          left = viewportWidth - contentRect.width
        }
        
        // Si no hay espacio abajo, mostrar arriba
        if (top + contentRect.height > viewportHeight + window.scrollY) {
          top = triggerRect.top - contentRect.height - sideOffset + window.scrollY
        }
        
        setPosition({ top, left })
      }
      
      updatePosition()
      
      // Actualizar posición al resize
      window.addEventListener('resize', updatePosition)
      return () => window.removeEventListener('resize', updatePosition)
    }, [open, triggerRef, sideOffset, align, alignOffset])
    
    if (!open) return null
    
    return (
      <DropdownMenuPortal>
        <div
          ref={mergeRefs(ref, contentRef)}
          data-dropdown-content
          className={cn(
            "z-50 max-h-[--dropdown-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            "--dropdown-content-available-height": "var(--radix-dropdown-menu-content-available-height, 300px)",
          } as React.CSSProperties}
          onClick={(e) => e.stopPropagation()}
          role="menu"
          aria-orientation="vertical"
          data-state={open ? "open" : "closed"}
          {...props}
        />
      </DropdownMenuPortal>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

// Item normal
interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
  onSelect?: () => void
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, disabled, onSelect, children, ...props }, ref) => {
    const { setOpen, activeItem, setActiveItem } = useDropdownMenu()
    const itemRef = React.useRef<HTMLDivElement>(null)
    const [itemIndex, setItemIndex] = useState(-1)
    
    // Registrar este item en el menú
    React.useEffect(() => {
      const index = itemRef.current?.getAttribute("data-index")
      if (index) {
        setItemIndex(parseInt(index))
      }
    }, [])
    
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
        ref={mergeRefs(ref, itemRef)}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
          inset && "pl-8",
          activeItem === itemIndex && "bg-accent text-accent-foreground",
          className
        )}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setActiveItem(itemIndex)}
        data-index={itemIndex}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

// Grupo de items
const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    role="group"
    {...props}
  />
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

// Item con checkbox
interface DropdownMenuCheckboxItemProps extends Omit<DropdownMenuItemProps, "onSelect"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, disabled, ...props }, ref) => {
    const { setOpen } = useDropdownMenu()
    
    const handleSelect = () => {
      if (disabled) return
      onCheckedChange?.(!checked)
      setOpen(false)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleSelect}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
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
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

// Radio group
interface DropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    const radioGroupContext = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange])
    
    return (
      <RadioGroupContext.Provider value={radioGroupContext}>
        <div
          ref={ref}
          className={className}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

// Radio item
interface DropdownMenuRadioItemProps extends Omit<DropdownMenuItemProps, "onSelect"> {
  value: string
}

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const { value: groupValue, onValueChange } = useRadioGroup()
    const { setOpen } = useDropdownMenu()
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
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        role="menuitemradio"
        aria-checked={checked}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleSelect}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault()
            handleSelect()
          }
        }}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    )
  }
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

// Label
interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

// Separador
const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    role="separator"
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

// Atajo de teclado
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Contexto para submenús
const SubMenuContext = React.createContext<{ id: string }>({ id: "" })

const useSubMenu = () => {
  const context = React.useContext(SubMenuContext)
  if (!context) {
    throw new Error("useSubMenu debe usarse dentro de un DropdownMenuSub")
  }
  return context
}

// Sub menú
interface DropdownMenuSubProps {
  children: React.ReactNode
}

const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  const id = React.useId()
  
  return (
    <SubMenuContext.Provider value={{ id }}>
      {children}
    </SubMenuContext.Provider>
  )
}
DropdownMenuSub.displayName = "DropdownMenuSub"

// Trigger para submenú
interface DropdownMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
}

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, children, disabled, ...props }, ref) => {
    const { id } = useSubMenu()
    const { openSubMenu, isSubMenuOpen } = useDropdownMenu()
    const isOpen = isSubMenuOpen(id)
    
    const handleMouseEnter = () => {
      if (!disabled) {
        openSubMenu(id)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          isOpen && "bg-accent",
          inset && "pl-8",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        onMouseEnter={handleMouseEnter}
        data-submenu-id={id}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto" />
      </div>
    )
  }
)
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

// Contenido del submenú
interface DropdownMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  ({ className, ...props }, ref) => {
    const { id } = useSubMenu()
    const { isSubMenuOpen } = useDropdownMenu()
    const isOpen = isSubMenuOpen(id)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    // Calcular la posición del submenú
    React.useEffect(() => {
      if (!isOpen || !contentRef.current) return
      
      const triggerElement = document.querySelector(`[data-submenu-id="${id}"]`)
      if (!triggerElement) return
      
      const triggerRect = triggerElement.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      
      // Colocar a la derecha del trigger
      let left = triggerRect.right + 5 + window.scrollX
      let top = triggerRect.top + window.scrollY
      
      // Ajustar si sale de la pantalla
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      if (left + contentRect.width > viewportWidth) {
        // Mostrar a la izquierda si no hay espacio a la derecha
        left = triggerRect.left - contentRect.width - 5 + window.scrollX
      }
      
      if (top + contentRect.height > viewportHeight + window.scrollY) {
        // Ajustar verticalmente si es necesario
        top = (viewportHeight + window.scrollY) - contentRect.height - 5
      }
      
      setPosition({ top, left })
    }, [isOpen, id])
    
    if (!isOpen) return null
    
    return (
      <DropdownMenuPortal>
        <div
          ref={mergeRefs(ref, contentRef)}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          role="menu"
          data-state={isOpen ? "open" : "closed"}
          {...props}
        />
      </DropdownMenuPortal>
    )
  }
)
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

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

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
