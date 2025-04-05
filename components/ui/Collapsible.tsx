"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { useState } from "react";

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Estado de apertura (controlado)
   */
  open?: boolean;
  /**
   * Estado inicial de apertura (no controlado)
   */
  defaultOpen?: boolean;
  /**
   * Callback cuando cambia el estado de apertura
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Estado deshabilitado
   */
  disabled?: boolean;
  /**
   * Contenido del collapsible
   */
  children: React.ReactNode;
}

const CollapsibleContext = React.createContext<{
  open: boolean;
  disabled?: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, className, open, defaultOpen = false, onOpenChange, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    const handleOpenChange = React.useCallback((value: boolean) => {
      if (disabled) return;
      
      if (open === undefined) {
        setIsOpen(value);
      }
      
      onOpenChange?.(value);
    }, [open, onOpenChange, disabled]);
    
    // Maneja props controladas
    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);
    
    const contextValue = React.useMemo(() => ({
      open: isOpen,
      disabled,
      onOpenChange: handleOpenChange,
    }), [isOpen, disabled, handleOpenChange]);
    
    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div 
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

// Hook para consumir el contexto
const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsibleContext debe usarse dentro de un Collapsible");
  }
  return context;
};

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Mostrar icono de chevron
   */
  showIcon?: boolean;
  /**
   * Clases adicionales para el icono
   */
  iconClassName?: string;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, showIcon = true, iconClassName, ...props }, ref) => {
    const { open, onOpenChange, disabled } = useCollapsibleContext();
    
    return (
      <button
        type="button"
        ref={ref}
        onClick={() => onOpenChange(!open)}
        disabled={disabled}
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-4 py-2 font-medium transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0",
              iconClassName
            )}
          />
        )}
      </button>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsibleContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    
    // Medir la altura del contenido
    React.useEffect(() => {
      if (!contentRef.current) return;
      
      const resizeObserver = new ResizeObserver((entries) => {
        const contentHeight = entries[0]?.contentRect.height || 0;
        setHeight(contentHeight);
      });
      
      resizeObserver.observe(contentRef.current);
      setIsInitialRender(false);
      
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
    
    // Manejar el estado de la animación
    React.useEffect(() => {
      if (open) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      }
    }, [open]);
    
    // Evitar la animación en el renderizado inicial si está cerrado
    if (!open && isInitialRender) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          className
        )}
        style={{
          // Establecer altura explícita para animación
          height: open ? height : 0,
          opacity: open ? 1 : 0,
          transform: `translateY(${open ? 0 : -8}px)`,
        }}
        {...props}
      >
        <div ref={contentRef} className="px-4 py-2">
          {children}
        </div>
      </div>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
