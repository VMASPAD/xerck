"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cva } from "class-variance-authority"
import { useState, useLayoutEffect } from "react"

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// Contexto para el NavigationMenu
type NavigationMenuContextType = {
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
  openMenus: Set<string>
  registerMenu: (id: string) => void
  setMenuOpen: (id: string, open: boolean) => void
  isMenuOpen: (id: string) => boolean
  contentRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType>({
  activeMenu: null,
  setActiveMenu: () => {},
  openMenus: new Set(),
  registerMenu: () => {},
  setMenuOpen: () => {},
  isMenuOpen: () => false,
  contentRefs: { current: new Map() }
})

const useNavigationMenu = () => {
  const context = React.useContext(NavigationMenuContext)
  if (!context) {
    throw new Error("useNavigationMenu debe usarse dentro de un NavigationMenu")
  }
  return context
}

// Contexto para cada menú individual
type NavigationItemContextType = {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const NavigationItemContext = React.createContext<NavigationItemContextType>({
  id: "",
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

const useNavigationItem = () => {
  const context = React.useContext(NavigationItemContext)
  if (!context) {
    throw new Error("useNavigationItem debe usarse dentro de un NavigationMenuItem")
  }
  return context
}

// Componente principal NavigationMenu
interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, viewportClassName, ...props }, ref) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set())
    const menuIds = React.useRef<Set<string>>(new Set())
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const contentRefs = React.useRef<Map<string, HTMLDivElement | null>>(new Map())
    
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
    
    // Cerrar menús al hacer clic fuera del componente
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (openMenus.size === 0) return
        
        const target = e.target as Node
        const container = ref.current
        
        if (container && !container.contains(target)) {
          setOpenMenus(new Set())
          setActiveMenu(null)
        }
      }
      
      document.addEventListener('mousedown', handleOutsideClick)
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [openMenus, ref])
    
    const contextValue = React.useMemo(() => ({
      activeMenu,
      setActiveMenu,
      openMenus,
      registerMenu,
      setMenuOpen,
      isMenuOpen,
      contentRefs
    }), [activeMenu, openMenus, registerMenu, setMenuOpen, isMenuOpen])
    
    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "relative z-10 flex max-w-max flex-1 items-center justify-center",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </NavigationMenuContext.Provider>
    )
  }
)
NavigationMenu.displayName = "NavigationMenu"

// Lista de elementos de navegación
interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "group flex flex-1 list-none items-center justify-center space-x-1",
          className
        )}
        {...props}
      />
    )
  }
)
NavigationMenuList.displayName = "NavigationMenuList"

// Elemento individual del menú de navegación
interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    const id = React.useId()
    const { registerMenu, isMenuOpen, setMenuOpen } = useNavigationMenu()
    const triggerRef = React.useRef<HTMLElement>(null)
    const open = isMenuOpen(id)
    
    React.useEffect(() => {
      registerMenu(id)
    }, [id, registerMenu])
    
    const setOpen = React.useCallback((value: boolean) => {
      setMenuOpen(id, value)
    }, [id, setMenuOpen])
    
    const contextValue = React.useMemo(() => ({
      id,
      open,
      setOpen,
      triggerRef
    }), [id, open, setOpen])
    
    return (
      <NavigationItemContext.Provider value={contextValue}>
        <li
          ref={ref}
          className={className}
          {...props}
        >
          {children}
        </li>
      </NavigationItemContext.Provider>
    )
  }
)
NavigationMenuItem.displayName = "NavigationMenuItem"

// Estilo para el trigger
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

// Trigger para el menú de navegación
interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = useNavigationItem()
    
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
    
    const handleClick = () => {
      setOpen(!open)
    }
    
    return (
      <button
        ref={ref}
        className={cn(navigationMenuTriggerStyle().toString(), "group", className)}
        onClick={handleClick}
        data-state={open ? "open" : "closed"}
        type="button"
        aria-expanded={open}
        {...props}
      >
        {children}{" "}
        <ChevronDown
          className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </button>
    )
  }
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

// Contenido del menú de navegación
interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, ...props }, ref) => {
    const { id, open, triggerRef } = useNavigationItem()
    const { contentRefs } = useNavigationMenu()
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 })
    
    // Combinar refs
    const handleRefSet = React.useCallback((node: HTMLDivElement | null) => {
      contentRef.current = node
      contentRefs.current.set(id, node)
      
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }, [ref, id, contentRefs])
    
    // Calcular la posición del contenido basado en el trigger
    useLayoutEffect(() => {
      if (open && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        
        setPosition({
          top: rect.bottom + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width
        })
      }
    }, [open, triggerRef])
    
    if (!open) return null
    
    return (
      <div
        ref={handleRefSet}
        className={cn(
          "absolute z-[100] min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className
        )}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          minWidth: `${position.width}px`,
          transformOrigin: 'top center'
        }}
        data-state={open ? "open" : "closed"}
        {...props}
      />
    )
  }
)
NavigationMenuContent.displayName = "NavigationMenuContent"

// Enlace de navegación
interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  asChild?: boolean
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, active, asChild, children, ...props }, ref) => {
    // Si asChild es true, clonamos el elemento hijo para agregarle las props necesarias
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(className, children.props.className),
        ...props,
      } as any)
    }
    
    return (
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          active && "bg-accent text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
NavigationMenuLink.displayName = "NavigationMenuLink"

// Indicador visual
interface NavigationMenuIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { activeMenu } = useNavigationMenu()
    
    return (
      <div
        ref={ref}
        className={cn(
          "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
          className
        )}
        data-state={activeMenu ? "visible" : "hidden"}
        {...props}
      >
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
      </div>
    )
  }
)
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

// Viewport para el contenido
interface NavigationMenuViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => {
    const { openMenus } = useNavigationMenu()
    
    return (
      <div className={cn("absolute left-0 top-full flex justify-center")}>
        <div
          ref={ref}
          className={cn(
            "origin-top-center relative mt-1.5 h-[var(--navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--navigation-menu-viewport-width)]",
            className
          )}
          style={{
            height: openMenus.size > 0 ? 'var(--navigation-menu-viewport-height)' : '0',
            width: openMenus.size > 0 ? 'var(--navigation-menu-viewport-width)' : '0',
            display: openMenus.size > 0 ? 'block' : 'none',
            '--navigation-menu-viewport-height': 'var(--radix-navigation-menu-viewport-height)',
            '--navigation-menu-viewport-width': 'var(--radix-navigation-menu-viewport-width)',
          } as React.CSSProperties}
          data-state={openMenus.size > 0 ? "open" : "closed"}
          {...props}
        />
      </div>
    )
  }
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
