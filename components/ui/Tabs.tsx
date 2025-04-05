"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// Contexto para compartir el estado entre componentes
interface TabsContextValue {
  selectedTab: string
  onChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  ...props
}: TabsProps) => {
  // Estado controlado vs no controlado
  const [selectedTab, setSelectedTab] = React.useState(value || defaultValue || "")
  
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : selectedTab
  
  const handleChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setSelectedTab(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )
  
  // Actualizar el estado interno cuando cambia el valor controlado
  React.useEffect(() => {
    if (isControlled) {
      setSelectedTab(value)
    }
  }, [isControlled, value])
  
  const contextValue = React.useMemo(
    () => ({
      selectedTab: currentValue,
      onChange: handleChange,
    }),
    [currentValue, handleChange]
  )
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      role="tablist"
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { selectedTab, onChange } = useTabs()
    const isActive = selectedTab === value
    
    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-background text-foreground shadow" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount, children, ...props }, ref) => {
    const { selectedTab } = useTabs()
    const isSelected = selectedTab === value
    
    if (!isSelected && !forceMount) {
      return null
    }
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        hidden={!isSelected}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isSelected ? "animate-in fade-in-0 zoom-in-95" : "animate-out fade-out-0 zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
