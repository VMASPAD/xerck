"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Check, ChevronRight, Circle } from "lucide-react"
import { useState } from "react"

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// Contexto para el Menubar
type MenubarContextType = {
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
  openMenus: Set<string>
  registerMenu: (id: string) => void
  setMenuOpen: (id: string, open: boolean) => void
  isMenuOpen: (id: string) => boolean
}

const MenubarContext = React.createContext<MenubarContextType>({
  activeMenu: null,
  setActiveMenu: () => {},
  openMenus: new Set(),
  registerMenu: () => {},
  setMenuOpen: () => {},
  isMenuOpen: () => false,
})

const useMenubar = () => {
  const context = React.useContext(MenubarContext)
  if (!context) {
    throw new Error("useMenubar debe usarse dentro de un Menubar")
  }
  return context
}

// Contexto para cada menú individual
type MenuContextType = {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const MenuContext = React.createContext<MenuContextType>({
  id: "",
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

const useMenu = () => {
  const context = React.useContext(MenuContext)
  if (!context) {
    throw new Error("useMenu debe usarse dentro de un MenubarMenu")
  }
  return context
}

// Contexto para el submenu
type SubMenuContextType = {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const SubMenuContext = React.createContext<SubMenuContextType>({
  id: "",
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

const useSubMenu = () => {
  const context = React.useContext(SubMenuContext)
  if (!context) {
    throw new Error("useSubMenu debe usarse dentro de un MenubarSub")
  }
  return context
}

// Contexto para el radio group
type RadioGroupContextType = {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextType>({
  value: undefined,
  onValueChange: undefined
})

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error("useRadioGroup debe usarse dentro de un MenubarRadioGroup")
  }
  return context
}

// Componente principal Menubar
interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set())
    const menuIds = React.useRef<Set<string>>(new Set())

    const registerMenu = React.useCallback((id: string) => {
      menuIds.current.add(id)
    }, [])

    const setMenuOpen = React.useCallback((id: string, open: boolean) => {
      setOpenMenus(prev => {
        const newOpenMenus = new Set(prev)
        if (open) {
          newOpenMenus.add(id)
        } else {
          newOpenMenus.delete(id)
        }
        return newOpenMenus
      })
    }, [])

    const isMenuOpen = React.useCallback((id: string) => {
      return openMenus.has(id)
    }, [openMenus])

    // Cerrar todos los menús cuando se hace clic fuera
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (openMenus.size === 0) return
        
        const target = e.target as Node
        const isInsideMenubar = ref.current?.contains(target)
        const isInsideMenu = document.querySelector('[data-menubar-content]')?.contains(target)
        
        if (!isInsideMenubar && !isInsideMenu) {
          setOpenMenus(new Set())
          setActiveMenu(null)
        }
      }
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && openMenus.size > 0) {
          setOpenMenus(new Set())
          setActiveMenu(null)
        }
      }
      
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [openMenus, ref])

    const contextValue = React.useMemo(() => ({
      activeMenu,
      setActiveMenu,
      openMenus,
      registerMenu,
      setMenuOpen,
      isMenuOpen,
    }), [activeMenu, openMenus, registerMenu, setMenuOpen, isMenuOpen])

    return (
      <MenubarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
            className
          )}
          role="menubar"
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    )
  }
)
Menubar.displayName = "Menubar"

// Componente para cada menú individual
interface MenubarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

function MenubarMenu({ children, ...props }: MenubarMenuProps) {
  const id = React.useId()
  const { registerMenu, isMenuOpen, setMenuOpen, activeMenu, setActiveMenu } = useMenubar()
  const triggerRef = React.useRef<HTMLElement>(null)
  const open = isMenuOpen(id)
  
  React.useEffect(() => {
    registerMenu(id)
  }, [id, registerMenu])
  
  const setOpen = React.useCallback((value: boolean) => {
    setMenuOpen(id, value)
    if (value) {
      setActiveMenu(id)
    } else if (activeMenu === id) {
      setActiveMenu(null)
    }
  }, [id, setMenuOpen, activeMenu, setActiveMenu])
  
  const contextValue = React.useMemo(() => ({
    id,
    open,
    setOpen,
    triggerRef
  }), [id, open, setOpen])
  
  return (
    <MenuContext.Provider value={contextValue}>
      <div role="none" {...props}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

// Grupo de elementos de menú
function MenubarGroup({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" {...props} />
}

// Portal para renderizar fuera del DOM
function MenubarPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return createPortal(children, document.body)
}

// Radio group
interface MenubarRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

function MenubarRadioGroup({ value, onValueChange, ...props }: MenubarRadioGroupProps) {
  const contextValue = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange])
  
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div role="radiogroup" {...props} />
    </RadioGroupContext.Provider>
  )
}

// Submenú
interface MenubarSubProps extends React.HTMLAttributes<HTMLDivElement> {}

function MenubarSub({ children, ...props }: MenubarSubProps) {
  const id = React.useId()
  const [open, setOpen] = useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  
  const contextValue = React.useMemo(() => ({
    id,
    open,
    setOpen,
    triggerRef
  }), [id, open])
  
  return (
    <SubMenuContext.Provider value={contextValue}>
      <div data-slot="menubar-sub" role="none" {...props}>
        {children}
      </div>
    </SubMenuContext.Provider>
  )
}

// Trigger para menú
interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const { id, open, setOpen, triggerRef } = useMenu()
    const { activeMenu } = useMenubar()
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          // Actualizar el ref interno
          triggerRef.current = node
          
          // Actualizar el ref externo
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    // Alternar apertura del menú al hacer clic
    const handleClick = () => {
      setOpen(!open)
    }
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className
        )}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MenubarTrigger.displayName = "MenubarTrigger"

// Trigger para submenú
interface MenubarSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  ({ className, inset, children, ...props }, forwardedRef) => {
    const { id, setOpen, triggerRef } = useSubMenu()
    
    // Combinar refs
    const ref = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          // Actualizar el ref interno
          triggerRef.current = node
          
          // Actualizar el ref externo
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }
      },
      [forwardedRef, triggerRef]
    )
    
    // Abrir el submenú al pasar el ratón
    const handleMouseEnter = () => {
      setOpen(true)
    }
    
    // Cerrar el submenú al salir
    const handleMouseLeave = (e: React.MouseEvent) => {
      // Solo cerrar si el ratón no se mueve hacia el contenido del submenú
      const relatedTarget = e.relatedTarget as Node
      if (!document.querySelector(`[data-submenu-content="${id}"]`)?.contains(relatedTarget)) {
        setOpen(false)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          inset && "pl-8",
          className
        )}
        role="menuitem"
        aria-haspopup="true"
        data-submenu-trigger={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    )
  }
)
MenubarSubTrigger.displayName = "MenubarSubTrigger"

// Contenido del submenú
// Contenido del submenú
interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, children, ...props }, ref) => {
    const { id, open, triggerRef } = useSubMenu()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    // Calcular posición del submenú
    React.useEffect(() => {
      if (!open || !triggerRef.current) return
      
      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect()
        
        if (!triggerRect) return
        
        // Colocar a la derecha del trigger
        let left = triggerRect.right + 5 + window.scrollX
        let top = triggerRect.top + window.scrollY
        
        // Ajustar si sale de pantalla
        if (contentRef.current) {
          const contentRect = contentRef.current.getBoundingClientRect()
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          
          if (left + contentRect.width > viewportWidth - 10) {
            // Si no cabe a la derecha, mostrar a la izquierda
            left = triggerRect.left - contentRect.width - 5 + window.scrollX
          }
          
          if (top + contentRect.height > viewportHeight - 10) {
            // Ajustar verticalmente para que no salga de pantalla
            top = Math.max(10, viewportHeight - contentRect.height - 10) + window.scrollY
          }
        }
        
        setPosition({ top, left })
      }
      
      // Pequeño retraso para asegurar que el DOM está actualizado
      setTimeout(updatePosition, 0)
      
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
      
      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition)
      }
    }, [open, triggerRef])
    
    if (!open) return null
    
    return (
      <MenubarPortal>
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
          data-state={open ? "open" : "closed"}
          data-submenu-content={id}
          {...props}
        >
          {children}
        </div>
      </MenubarPortal>
    )
  }
)
MenubarSubContent.displayName = "MenubarSubContent"

// Contenido del menú
interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  alignOffset?: number
  sideOffset?: number
}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ 
    className, 
    align = "start", 
    alignOffset = -4, 
    sideOffset = 8,
    ...props 
  }, ref) => {
    const { id, open, triggerRef } = useMenu()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    // Calcular la posición del menú
    React.useEffect(() => {
      if (!open) return
      
      const updatePosition = () => {
        if (!triggerRef.current) return
        
        const triggerRect = triggerRef.current.getBoundingClientRect()
        
        // Posicionar debajo del trigger
        const top = triggerRect.bottom + sideOffset + window.scrollY
        let left = 0
        
        // Alineación horizontal
        switch (align) {
          case "start":
            left = triggerRect.left + alignOffset + window.scrollX
            break
          case "center":
            left = triggerRect.left + (triggerRect.width / 2) - (contentRef.current?.offsetWidth || 0) / 2 + alignOffset + window.scrollX
            break
          case "end":
            left = triggerRect.right - (contentRef.current?.offsetWidth || 0) + alignOffset + window.scrollX
            break
        }
        
        // Ajustar si sale de la pantalla
        if (contentRef.current) {
          const contentWidth = contentRef.current.offsetWidth
          const viewportWidth = window.innerWidth
          
          if (left < 10) {
            left = 10
          } else if (left + contentWidth > viewportWidth - 10) {
            left = viewportWidth - contentWidth - 10
          }
        }
        
        setPosition({
          top,
          left
        })
      }
      
      // Pequeño retraso para asegurar que el DOM está actualizado
      setTimeout(updatePosition, 0)
      
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
      
      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition)
      }
    }, [open, triggerRef, align, alignOffset, sideOffset])
    
    if (!open) return null
    
    return (
      <MenubarPortal>
        <div
          ref={mergeRefs(ref, contentRef)}
          className={cn(
            "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            className
          )}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            transformOrigin: 'var(--origin-x, 50%) var(--origin-y, 0%)',
          }}
          role="menu"
          aria-orientation="vertical"
          data-state={open ? "open" : "closed"}
          data-menubar-content
          {...props}
        />
      </MenubarPortal>
    )
  }
)
MenubarContent.displayName = "MenubarContent"

// Ítem de menú
interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
  disabled?: boolean
}

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          inset && "pl-8",
          className
        )}
        role="menuitem"
        data-disabled={disabled ? "" : undefined}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...props}
      />
    )
  }
)
MenubarItem.displayName = "MenubarItem"

// Ítem de checkbox
interface MenubarCheckboxItemProps extends Omit<MenubarItemProps, "checked"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, disabled, ...props }, ref) => {
    const handleSelect = () => {
      if (!disabled) {
        onCheckedChange?.(!checked)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        role="menuitemcheckbox"
        aria-checked={checked}
        data-disabled={disabled ? "" : undefined}
        data-state={checked ? "checked" : "unchecked"}
        onClick={handleSelect}
        tabIndex={disabled ? -1 : 0}
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

// Ítem de radio
interface MenubarRadioItemProps extends Omit<MenubarItemProps, "value"> {
  value: string
}

const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const { value: groupValue, onValueChange } = useRadioGroup()
    const checked = value === groupValue
    
    const handleSelect = () => {
      if (!disabled) {
        onValueChange?.(value)
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        role="menuitemradio"
        aria-checked={checked}
        data-disabled={disabled ? "" : undefined}
        data-state={checked ? "checked" : "unchecked"}
        onClick={handleSelect}
        tabIndex={disabled ? -1 : 0}
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
MenubarRadioItem.displayName = "MenubarRadioItem"

// Etiqueta
interface MenubarLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
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
  }
)
MenubarLabel.displayName = "MenubarLabel"

// Separador
interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarSeparator = React.forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        role="separator"
        {...props}
      />
    )
  }
)
MenubarSeparator.displayName = "MenubarSeparator"

// Atajo de teclado
const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
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
MenubarShortcut.displayName = "MenubarShortcut"

// Función para combinar refs
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
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
