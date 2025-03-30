import React, { useState, createContext, useContext } from 'react';
import "../app/globals.css";
import { ChevronDown, Plus, Minus } from 'lucide-react';

// Contexto para manejar el estado del acordeón
type AccordionContextType = {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  type: 'single' | 'multiple';
  activeItems: string[];
  toggleItem: (id: string) => void;
  iconVariant?: 'chevron' | 'plus-minus';
  variant: AccordionProps['variant'];
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Contexto para cada item individual
type AccordionItemContextType = {
  value: string;
  disabled?: boolean;
};

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

// Props principales del acordeón
export interface AccordionProps {
  /** Los elementos hijos del acordeón */
  children: React.ReactNode;
  /** Tipo de acordeón: simple (solo un elemento abierto) o múltiple */
  type?: 'single' | 'multiple';
  /** ID del elemento activo por defecto (para tipo 'single') */
  defaultValue?: string;
  /** IDs de los elementos activos por defecto (para tipo 'multiple') */
  defaultValues?: string[];
  /** Clase CSS personalizada */
  className?: string;
  /** Variante visual */
  variant?: 'default' | 'bordered' | 'ghost' | 'elevated' | 'filled' | 'compact' | 'card' | 'colorful';
  /** Icono alternativo para el acordeón */
  iconVariant?: 'chevron' | 'plus-minus';
}

// Props del elemento individual del acordeón
export interface AccordionItemProps {
  /** Contenido del elemento */
  children: React.ReactNode;
  /** Identificador único del elemento */
  value: string;
  /** Clase CSS personalizada */
  className?: string;
  /** Si está deshabilitado */
  disabled?: boolean;
}

// Props del disparador del acordeón
export interface AccordionTriggerProps {
  /** Contenido del disparador */
  children: React.ReactNode;
  /** Clase CSS personalizada */
  className?: string;
}

// Props del contenido del acordeón
export interface AccordionContentProps {
  /** Contenido */
  children: React.ReactNode;
  /** Clase CSS personalizada */
  className?: string;
}

// Variantes de estilo del acordeón
const variantStyles = {
  default: "border-b border-border",
  bordered: "border border-border rounded-md",
  ghost: "bg-transparent",
  // Nuevas variantes profesionales
  elevated: "border border-border rounded-lg shadow-md bg-card text-card-foreground",
  filled: "rounded-md bg-muted overflow-hidden divide-y divide-border/40",
  compact: "border border-border rounded-md text-sm [&>[data-state]]:py-1",
  card: "rounded-lg overflow-hidden shadow-sm bg-card text-card-foreground divide-y divide-border",
  colorful: "rounded-md overflow-hidden bg-primary/10 text-primary border border-primary/20"
};

// Hook personalizado para acceder al contexto
function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

export const Accordion = ({
  children,
  type = 'single',
  defaultValue = null,
  defaultValues = [],
  className = '',
  variant = 'default',
  iconVariant = 'chevron',
  ...props
}: AccordionProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(defaultValue);
  const [activeItems, setActiveItems] = useState<string[]>(defaultValues);

  const toggleItem = (id: string) => {
    setActiveItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <AccordionContext.Provider value={{ 
      activeItem, 
      setActiveItem, 
      type, 
      activeItems, 
      toggleItem,
      iconVariant,
      variant
    }}>
      <div className={`${variantStyles[variant]} w-full ${className}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ children, value, className = '', disabled = false }: AccordionItemProps) => {
  const context = useAccordionContext();
  
  const isOpen = context.type === 'multiple' 
    ? context.activeItems.includes(value)
    : context.activeItem === value;

  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? true : undefined}
        className={`overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children, className = '' }: AccordionTriggerProps) => {
  const context = useAccordionContext();
  const itemContext = useContext(AccordionItemContext);
  
  if (!itemContext) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }
  
  const { value, disabled } = itemContext;
  
  const handleClick = () => {
    if (disabled) return;
    
    if (context.type === 'single') {
      context.setActiveItem(context.activeItem === value ? null : value);
    } else {
      context.toggleItem(value);
    }
  };
  
  const isOpen = context.type === 'multiple' 
    ? context.activeItems.includes(value)
    : context.activeItem === value;
    
  // Estilos específicos según la variante
  const variantTriggerStyles = {
    default: "hover:bg-muted/50",
    bordered: "hover:bg-muted/50",
    ghost: "hover:underline",
    elevated: "hover:bg-muted/50 font-medium",
    filled: "bg-muted/70 hover:bg-muted",
    compact: "px-3 py-2 text-sm",
    card: "bg-card hover:bg-muted/50 font-medium",
    colorful: "hover:bg-primary/20 font-medium"
  };

  return (
    <button
      className={`flex justify-between w-full p-4 text-left font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all ${variantTriggerStyles[context.variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {context.iconVariant === 'plus-minus' ? (
        isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />
      ) : (
        <ChevronDown
          className="h-5 w-5 transition-transform duration-300 shrink-0"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      )}
    </button>
  );
};

export const AccordionContent = ({ children, className = '' }: AccordionContentProps) => {
  const context = useAccordionContext();
  const itemContext = useContext(AccordionItemContext);
  
  if (!itemContext) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }
  
  const { value } = itemContext;
  
  const isOpen = context.type === 'multiple' 
    ? context.activeItems.includes(value)
    : context.activeItem === value;
    
  // Estilos específicos según la variante
  const variantContentStyles = {
    default: "",
    bordered: "",
    ghost: "",
    elevated: "bg-card",
    filled: "bg-muted/30",
    compact: "px-3 text-sm",
    card: "bg-card",
    colorful: "bg-background/60"
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} ${variantContentStyles[context.variant]} ${className}`}
    >
      <div className={`p-4 ${context.variant === 'compact' ? 'pt-1 pb-3' : 'pt-0'}`}>{children}</div>
    </div>
  );
};

// Componente para testing en Storybook
export const TestAccordion = (props: Omit<AccordionProps, 'children'>) => (
    <Accordion type={props.type || 'multiple'} variant={props.variant || 'default'} defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
        <AccordionItem value="item-1">
            <AccordionTrigger>¿Qué es un acordeón?</AccordionTrigger>
            <AccordionContent>
                Un acordeón es un componente de interfaz de usuario que muestra un conjunto de 
                paneles apilados, donde cada panel puede expandirse o contraerse para mostrar u 
                ocultar su contenido asociado.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>¿Para qué se utiliza?</AccordionTrigger>
            <AccordionContent>
                Se utiliza para organizar contenido en espacios reducidos, permitiendo a 
                los usuarios acceder solamente a la información que necesitan en un momento dado. 
                Es ideal para secciones de FAQ, menús de navegación o formularios complejos.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger>¿Cómo se implementa?</AccordionTrigger>
            <AccordionContent>
                Se implementa utilizando componentes anidados para gestionar el estado de 
                expansión y contracción. En React, se suelen utilizar contextos para 
                administrar el estado entre los componentes relacionados.
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

// Componentes de ejemplo para las nuevas variantes
export const ElevatedAccordion = (props: Omit<AccordionProps, 'children' | 'variant'>) => (
  <Accordion type={props.type || 'single'} variant="elevated" defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Diseño Elevado</AccordionTrigger>
      <AccordionContent>
        Esta variante incluye sombras y bordes para crear sensación de elevación en la interfaz.
        Ideal para paneles de control y áreas donde el acordeón es un elemento importante.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Uso Recomendado</AccordionTrigger>
      <AccordionContent>
        Ideal para dashboards, páginas de configuración y áreas donde quieres destacar el contenido.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const FilledAccordion = (props: Omit<AccordionProps, 'children' | 'variant'>) => (
  <Accordion type={props.type || 'single'} variant="filled" defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Estilo con Relleno</AccordionTrigger>
      <AccordionContent>
        Usa un fondo sólido para todo el componente, aumentando el contraste visual.
        Ideal para secciones que necesitan destacar del resto del contenido.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Aplicaciones</AccordionTrigger>
      <AccordionContent>
        Perfecto para páginas de FAQ, documentación y secciones informativas.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const CompactAccordion = (props: Omit<AccordionProps, 'children' | 'variant'>) => (
  <Accordion type={props.type || 'single'} variant="compact" defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Versión Compacta</AccordionTrigger>
      <AccordionContent>
        Diseño condensado para interfaces con espacio limitado. Texto más pequeño y espaciado reducido.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Usos Recomendados</AccordionTrigger>
      <AccordionContent>
        Barras laterales, menús desplegables y paneles donde el espacio es valioso.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const CardAccordion = (props: Omit<AccordionProps, 'children' | 'variant'>) => (
  <Accordion type={props.type || 'single'} variant="card" defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Estilo de Tarjeta</AccordionTrigger>
      <AccordionContent>
        Apariencia visual de tarjeta con sombras suaves. Proporciona una sensación más sustancial.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Mejor para</AccordionTrigger>
      <AccordionContent>
        Interfaces donde predominan componentes tipo card como dashboards o portales administrativos.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const ColorfulAccordion = (props: Omit<AccordionProps, 'children' | 'variant'>) => (
  <Accordion type={props.type || 'single'} variant="colorful" defaultValue={props.defaultValue} defaultValues={props.defaultValues}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Variante con Color</AccordionTrigger>
      <AccordionContent>
        Utiliza los colores primarios de la aplicación para destacar visualmente el componente.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>¿Cuándo usarlo?</AccordionTrigger>
      <AccordionContent>
        Excelente para guías paso a paso, tutoriales o información destacada que quieres que el usuario note.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

 