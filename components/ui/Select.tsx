"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { useState } from "react"

// Contexto del Select
type SelectContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string | undefined
  onValueChange: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
  listRef: React.RefObject<HTMLDivElement>
  placeholder?: string
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  onSearch?: (value: string) => void
  searchable?: boolean
  setScrollUpVisible: React.Dispatch<React.SetStateAction<boolean>>
  setScrollDownVisible: React.Dispatch<React.SetStateAction<boolean>>
  scrollUpVisible: boolean
  scrollDownVisible: boolean
  position: "popper" | "item-aligned"
  valueNode: React.ReactNode
  setValueNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  registerOption: (value: string, node: HTMLDivElement) => void
  unregisterOption: (value: string) => void
  activeDescendant: string | null
  setActiveDescendant: React.Dispatch<React.SetStateAction<string | null>>
  registerItemLabel: (value: string, label: React.ReactNode) => void
  itemLabels: Map<string, React.ReactNode>
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

// Hook para consumir el contexto
function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("useSelectContext debe usarse dentro de un Select")
  }
  return context
}

// Contexto del Grupo
type SelectGroupContextType = {
  id: string
}

const SelectGroupContext = React.createContext<SelectGroupContextType | undefined>(undefined)

function useSelectGroupContext() {
  return React.useContext(SelectGroupContext)
}

// Componente principal Select
interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  searchable?: boolean
  onSearch?: (value: string) => void
  position?: "popper" | "item-aligned"
}

const Select = ({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  required,
  disabled,
  placeholder,
  searchable = false,
  onSearch,
  position = "popper"
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || "")
  const [searchValue, setSearchValue] = useState("")
  const [scrollUpVisible, setScrollUpVisible] = useState(false)
  const [scrollDownVisible, setScrollDownVisible] = useState(false)
  const [valueNode, setValueNode] = useState<React.ReactNode>(placeholder)
  const [options, setOptions] = useState<Map<string, HTMLDivElement>>(new Map())
  const [activeDescendant, setActiveDescendant] = useState<string | null>(null)
  const [itemLabels, setItemLabels] = useState<Map<string, React.ReactNode>>(new Map())
  
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  
  // Manejar el cambio de valor
  const handleValueChange = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }, [isControlled, onValueChange])
  
  // Registrar etiquetas de opciones para mostrar el valor seleccionado
  const registerItemLabel = React.useCallback((optionValue: string, label: React.ReactNode) => {
    setItemLabels(prev => {
      const newMap = new Map(prev)
      newMap.set(optionValue, label)
      return newMap
    })
  }, [])
  
  // Registrar y desregistrar opciones para navegación por teclado
  const registerOption = React.useCallback((optionValue: string, node: HTMLDivElement) => {
    setOptions(prev => {
      const newMap = new Map(prev)
      newMap.set(optionValue, node)
      return newMap
    })
  }, [])
  
  const unregisterOption = React.useCallback((optionValue: string) => {
    setOptions(prev => {
      const newMap = new Map(prev)
      newMap.delete(optionValue)
      return newMap
    })
  }, [])
  
  // Cerrar el select al hacer clic fuera
  React.useEffect(() => {
    if (!open) return
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearchValue("")
      }
    }
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        setSearchValue("")
        triggerRef.current?.focus()
      }
    }
    
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])
  
  // Actualizar el valor mostrado cuando cambie el valor seleccionado
  React.useEffect(() => {
    if (value && itemLabels.has(value)) {
      setValueNode(itemLabels.get(value))
    } else if (!value && placeholder) {
      setValueNode(placeholder)
    }
  }, [value, itemLabels, placeholder])
  
  // Navegación por teclado en el select
  React.useEffect(() => {
    if (!open) return
    
    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "Enter", "Home", "End"].includes(event.key)) return
      
      event.preventDefault()
      
      const optionValues = Array.from(options.keys())
      if (optionValues.length === 0) return
      
      const currentIndex = activeDescendant ? optionValues.indexOf(activeDescendant) : -1
      
      let nextIndex: number
      
      switch (event.key) {
        case "ArrowDown":
          nextIndex = currentIndex < optionValues.length - 1 ? currentIndex + 1 : 0
          break
        case "ArrowUp":
          nextIndex = currentIndex > 0 ? currentIndex - 1 : optionValues.length - 1
          break
        case "Home":
          nextIndex = 0
          break
        case "End":
          nextIndex = optionValues.length - 1
          break
        case "Enter":
          if (activeDescendant) {
            handleValueChange(activeDescendant)
          }
          return
        default:
          return
      }
      
      const nextValue = optionValues[nextIndex]
      setActiveDescendant(nextValue)
      
      // Desplazar al elemento activo
      const optionNode = options.get(nextValue)
      if (optionNode && listRef.current) {
        const optionRect = optionNode.getBoundingClientRect()
        const listRect = listRef.current.getBoundingClientRect()
        
        if (optionRect.bottom > listRect.bottom) {
          listRef.current.scrollTop += optionRect.bottom - listRect.bottom
        } else if (optionRect.top < listRect.top) {
          listRef.current.scrollTop -= listRect.top - optionRect.top
        }
      }
    }
    
    document.addEventListener("keydown", handleArrowNavigation)
    
    return () => {
      document.removeEventListener("keydown", handleArrowNavigation)
    }
  }, [open, options, activeDescendant, handleValueChange])
  
  // Búsqueda por caracteres en el select
  React.useEffect(() => {
    if (!open || !searchable) return
    
    const handleCharacterNavigation = (event: KeyboardEvent) => {
      // Ignorar teclas especiales
      if (event.ctrlKey || event.altKey || event.metaKey) return
      if (event.key.length !== 1) return
      
      // Agregar el carácter a la búsqueda
      setSearchValue(prev => {
        const newValue = prev + event.key
        onSearch?.(newValue)
        return newValue
      })
      
      // Limpiar la búsqueda después de un tiempo
      const timerId = setTimeout(() => {
        setSearchValue("")
      }, 1000)
      
      return () => clearTimeout(timerId)
    }
    
    document.addEventListener("keydown", handleCharacterNavigation)
    
    return () => {
      document.removeEventListener("keydown", handleCharacterNavigation)
    }
  }, [open, searchable, onSearch])
  
  // Comprobar visibilidad de botones de desplazamiento
  const checkScrollVisibility = () => {
    if (!listRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    
    setScrollUpVisible(scrollTop > 0)
    setScrollDownVisible(scrollTop + clientHeight < scrollHeight)
  }
  
  // Contexto para compartir entre componentes
  const contextValue = React.useMemo(() => ({
    open,
    setOpen,
    value,
    onValueChange: handleValueChange,
    disabled,
    required,
    name,
    triggerRef,
    contentRef,
    listRef,
    placeholder,
    searchValue,
    setSearchValue,
    onSearch,
    searchable,
    setScrollUpVisible,
    setScrollDownVisible,
    scrollUpVisible,
    scrollDownVisible,
    position,
    valueNode,
    setValueNode,
    registerOption,
    unregisterOption,
    activeDescendant,
    setActiveDescendant,
    registerItemLabel,
    itemLabels,
  }), [
    open, 
    value, 
    handleValueChange, 
    disabled, 
    required,
    name,
    placeholder,
    searchValue,
    onSearch,
    searchable,
    scrollUpVisible,
    scrollDownVisible,
    position,
    valueNode,
    registerOption,
    unregisterOption,
    activeDescendant,
    registerItemLabel,
    itemLabels,
  ])
  
  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}
Select.displayName = "Select"

// Grupo de opciones
interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, ...props }, ref) => {
    const id = React.useId()
    
    return (
      <SelectGroupContext.Provider value={{ id }}>
        <div role="group" ref={ref} {...props}>
          {children}
        </div>
      </SelectGroupContext.Provider>
    )
  }
)
SelectGroup.displayName = "SelectGroup"

// Componente para el valor seleccionado
interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    const { value, itemLabels } = useSelectContext()
    
    // Si hay un valor seleccionado y tenemos su etiqueta
    if (value && itemLabels.has(value)) {
      return (
        <span ref={ref} {...props}>
          {itemLabels.get(value)}
        </span>
      )
    }
    
    // Si no hay valor pero hay placeholder
    if (!value && placeholder) {
      return (
        <span ref={ref} {...props} className={cn("text-muted-foreground", className)}>
          {placeholder}
        </span>
      )
    }
    
    // Caso fallback
    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

// Botón disparador del select
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { 
      open, 
      setOpen, 
      disabled, 
      triggerRef, 
      required,
      valueNode,
    } = useSelectContext()
    
    // Combinar refs
    const handleRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          triggerRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }
      },
      [ref, triggerRef]
    )
    
    // Manejar apertura/cierre
    const handleClick = () => {
      if (!disabled) {
        setOpen(prev => !prev)
      }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    
    return (
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-required={required}
        aria-haspopup="listbox"
        ref={handleRef}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...props}
      >
        {children || valueNode}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// Botón para desplazamiento hacia arriba
interface SelectScrollUpButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectScrollUpButton = React.forwardRef<HTMLDivElement, SelectScrollUpButtonProps>(
  ({ className, ...props }, ref) => {
    const { scrollUpVisible, listRef } = useSelectContext()
    
    if (!scrollUpVisible) return null
    
    const handleClick = () => {
      if (!listRef.current) return
      listRef.current.scrollTop -= 100
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-default items-center justify-center py-1",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <ChevronUp className="h-4 w-4" />
      </div>
    )
  }
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

// Botón para desplazamiento hacia abajo
interface SelectScrollDownButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectScrollDownButton = React.forwardRef<HTMLDivElement, SelectScrollDownButtonProps>(
  ({ className, ...props }, ref) => {
    const { scrollDownVisible, listRef } = useSelectContext()
    
    if (!scrollDownVisible) return null
    
    const handleClick = () => {
      if (!listRef.current) return
      listRef.current.scrollTop += 100
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-default items-center justify-center py-1",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <ChevronDown className="h-4 w-4" />
      </div>
    )
  }
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

// Contenido desplegable del select
interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned"
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position: positionProp, ...props }, ref) => {
    const {
      open,
      contentRef,
      listRef,
      triggerRef,
      position: contextPosition,
    } = useSelectContext()
    const [mounted, setMounted] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const [side, setSide] = useState<"top" | "bottom">("bottom")
    
    const position_ = positionProp || contextPosition
    
    // Marcar como montado
    React.useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])
    
    // Calcular posición del contenido
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return
      
      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect()
        if (!triggerRect) return
        
        const { height: contentHeight } = contentRef.current.getBoundingClientRect()
        
        // Espacio disponible arriba y abajo
        const spaceAbove = triggerRect.top
        const spaceBelow = window.innerHeight - triggerRect.bottom
        
        // Determinar si debe mostrarse arriba o abajo
        const showBelow = spaceBelow >= contentHeight || spaceBelow > spaceAbove
        
        let top = 0
        if (showBelow) {
          top = triggerRect.bottom + 1 // +1 para evitar superposición
          setSide("bottom")
        } else {
          top = triggerRect.top - contentHeight - 1
          setSide("top")
        }
        
        // Ajustar al viewport si es necesario
        if (top < 5) top = 5
        if (top + contentHeight > window.innerHeight - 5) {
          top = window.innerHeight - contentHeight - 5
        }
        
        // Ancho y posición horizontal
        let width = triggerRect.width
        let left = triggerRect.left
        
        if (position_ === "popper") {
          // No hacer nada, usar el ancho del trigger
        } else {
          // Asegurar que el contenido no salga de la pantalla
          if (left + width > window.innerWidth - 10) {
            left = window.innerWidth - width - 10
          }
          if (left < 10) {
            left = 10
          }
        }
        
        setPosition({
          top: top + window.scrollY,
          left: left + window.scrollX,
          width,
        })
      }
      
      updatePosition()
      
      window.addEventListener("resize", updatePosition)
      window.addEventListener("scroll", updatePosition)
      
      return () => {
        window.removeEventListener("resize", updatePosition)
        window.removeEventListener("scroll", updatePosition)
      }
    }, [open, triggerRef, contentRef, position_])
    
    // Manejar desplazamiento automático para mostrar el elemento seleccionado
    React.useEffect(() => {
      if (!open || !listRef.current) return
      
      const scrollToSelectedOption = () => {
        const selectedOption = listRef.current?.querySelector('[aria-selected="true"]')
        if (selectedOption) {
          selectedOption.scrollIntoView({ block: "nearest" })
        }
      }
      
      // Pequeño retraso para asegurar que el DOM está actualizado
      const timerId = setTimeout(scrollToSelectedOption, 10)
      
      return () => clearTimeout(timerId)
    }, [open, listRef])
    
    // Verificar botones de desplazamiento al cambiar el scroll
    const handleScroll = () => {
      if (!listRef.current) return
      
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      
      const scrollUpVisible = scrollTop > 0
      const scrollDownVisible = scrollTop + clientHeight < scrollHeight
      
      if (scrollUpVisible !== scrollUpVisible || scrollDownVisible !== scrollDownVisible) {
        // Actualizar si cambió la visibilidad
        scrollUpVisible ? scrollUpVisible : false
        scrollDownVisible ? scrollDownVisible : false
      }
    }
    
    // No renderizar si no está abierto o montado
    if (!mounted || !open) return null
    
    const content = (
      <div
        ref={mergeRefs(ref, contentRef)}
        className={cn(
          "relative z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
          position_ === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          width: position_ === "popper" ? position.width : "auto",
          maxWidth: "var(--radix-popper-available-width, 90vw)",
          transformOrigin: 
            side === "top"
              ? "bottom center"
              : "top center",
        }}
        data-state={open ? "open" : "closed"}
        data-side={side}
        {...props}
      >
        <SelectScrollUpButton />
        <div
          ref={listRef}
          className={cn(
            "overflow-y-auto overflow-x-hidden p-1 max-h-[--radix-select-content-available-height]",
            position_ === "popper" && "h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]"
          )}
          role="listbox"
          style={{ maxHeight: "300px" }} // Altura máxima fija
          onScroll={handleScroll}
        >
          {children}
        </div>
        <SelectScrollDownButton />
      </div>
    )
    
    return createPortal(content, document.body)
  }
)
SelectContent.displayName = "SelectContent"

// Etiqueta para el grupo de opciones
interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => {
    const selectGroup = useSelectGroupContext()
    const id = selectGroup ? `${selectGroup.id}-label` : undefined
    
    return (
      <div
        ref={ref}
        className={cn("px-2 py-1.5 text-sm font-semibold", className)}
        id={id}
        {...props}
      />
    )
  }
)
SelectLabel.displayName = "SelectLabel"

// Opción seleccionable
interface SelectItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "id"> {
  value: string
  disabled?: boolean
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const selectContext = useSelectContext()
    const selectGroup = useSelectGroupContext()
    const isSelected = selectContext.value === value
    const id = React.useId()
    const fullId = `select-item-${id}`
    const isActive = selectContext.activeDescendant === value
    
    const optionRef = React.useRef<HTMLDivElement>(null)
    
    // Registrar esta opción para navegación por teclado
    React.useEffect(() => {
      if (optionRef.current) {
        selectContext.registerOption(value, optionRef.current)
      }
      
      return () => {
        selectContext.unregisterOption(value)
      }
    }, [value, selectContext.registerOption, selectContext.unregisterOption])
    
    // Registrar el contenido de la etiqueta para mostrar cuando se seleccione
    React.useEffect(() => {
      selectContext.registerItemLabel(value, children)
    }, [value, children, selectContext.registerItemLabel])
    
    // Manejar selección
    const handleClick = () => {
      if (!disabled) {
        selectContext.onValueChange(value)
      }
    }
    
    // Combinar refs
    const mergedRef = mergeRefs(ref, optionRef)
    
    return (
      <div
        ref={mergedRef}
        role="option"
        aria-selected={isSelected}
        id={fullId}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        data-selected={isSelected ? "" : undefined}
        data-highlighted={isActive ? "" : undefined}
        data-value={value}
        aria-labelledby={selectGroup?.id ? `${selectGroup.id}-label` : undefined}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

// Separador visual
interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
      />
    )
  }
)
SelectSeparator.displayName = "SelectSeparator"

// Función auxiliar para combinar refs
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
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
