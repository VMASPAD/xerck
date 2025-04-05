"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { useState } from "react"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Valores mínimo y máximo del slider
   * @default [0, 100]
   */
  range?: [number, number]
  
  /**
   * Valor(es) del slider
   * Para slider de un valor: number
   * Para slider de rango: [número, número]
   */
  value?: number | [number, number]
  
  /**
   * Valor por defecto
   */
  defaultValue?: number | [number, number]
  
  /**
   * Tamaño del paso
   * @default 1
   */
  step?: number
  
  /**
   * Callback cuando el valor cambia
   */
  onValueChange?: (value: number | [number, number]) => void
  
  /**
   * Valor mínimo permitido
   * @default 0
   */
  min?: number
  
  /**
   * Valor máximo permitido
   * @default 100
   */
  max?: number
  
  /**
   * Mostrar varios thumbs (manijas)
   * @default false
   */
  multiple?: boolean
  
  /**
   * Mostrar marcas en el track
   * @default false
   */
  showMarks?: boolean
  
  /**
   * Intervalo entre marcas
   * @default 25
   */
  markInterval?: number
  
  /**
   * Mostrar valores sobre los thumbs
   * @default false
   */
  showValues?: boolean
  
  /**
   * Formato para mostrar los valores
   * @default "{value}"
   */
  valueFormat?: string
}

/**
 * Componente Slider
 * 
 * Un control deslizante que permite al usuario seleccionar un valor o rango
 * dentro de un intervalo especificado.
 */
const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({
    className,
    range = [0, 100],
    value,
    defaultValue,
    step = 1,
    onValueChange,
    min = 0,
    max = 100,
    disabled = false,
    multiple = false,
    showMarks = false,
    markInterval = 25,
    showValues = false,
    valueFormat = "{value}",
    ...props
  }, ref) => {
    // Estado para el valor controlado o no controlado
    const [internalValue, setInternalValue] = useState<number | [number, number]>(
      value !== undefined 
        ? value 
        : defaultValue !== undefined 
          ? defaultValue 
          : multiple ? [min, max] : min
    );
    
    // Actualizar el estado interno cuando cambia el valor externo
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);
    
    // Obtener el valor actual (controlado o no controlado)
    const currentValue = value !== undefined ? value : internalValue;
    
    // Función para formatear el valor según el formato especificado
    const formatValue = (val: number) => {
      return valueFormat.replace("{value}", val.toString());
    };
    
    // Referencias para los elementos del slider
    const containerRef = React.useRef<HTMLDivElement>(null);
    const leftThumbRef = React.useRef<HTMLDivElement>(null);
    const rightThumbRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const rangeRef = React.useRef<HTMLDivElement>(null);
    
    // Estado para el arrastre
    const isDraggingRef = React.useRef<number | null>(null);
    
    // Calcular el porcentaje basado en el valor
    const calculatePercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };
    
    // Calcular el valor basado en la posición
    const calculateValue = (position: number, width: number) => {
      const percentage = Math.max(0, Math.min(100, (position / width) * 100));
      const rawValue = min + ((max - min) * percentage) / 100;
      
      // Ajustar al paso más cercano
      const steppedValue = Math.round(rawValue / step) * step;
      
      // Restringir al rango permitido
      return Math.max(min, Math.min(max, steppedValue));
    };
    
    // Manejar cambios en la posición
    const handlePositionChange = (clientX: number, thumbIndex: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const left = rect.left;
      
      const position = clientX - left;
      const newValue = calculateValue(position, width);
      
      // Actualizar el valor según sea single o múltiple
      if (multiple && Array.isArray(currentValue)) {
        const newValues = [...currentValue] as [number, number];
        newValues[thumbIndex] = newValue;
        
        // Asegurar que los valores estén ordenados
        if (thumbIndex === 0 && newValue > newValues[1]) {
          newValues[0] = newValues[1];
        } else if (thumbIndex === 1 && newValue < newValues[0]) {
          newValues[1] = newValues[0];
        }
        
        setInternalValue(newValues);
        onValueChange?.(newValues);
      } else {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      }
    };
    
    // Manejar eventos de mouse
    const handleMouseDown = (e: React.MouseEvent, thumbIndex: number) => {
      if (disabled) return;
      
      e.preventDefault();
      isDraggingRef.current = thumbIndex;
      handlePositionChange(e.clientX, thumbIndex);
      
      // Agregar eventos globales
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current === null) return;
      handlePositionChange(e.clientX, isDraggingRef.current);
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Manejar clic en el track
    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return;
      
      // Determinar qué thumb mover
      let thumbIndex = 0;
      
      if (multiple && Array.isArray(currentValue)) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const clickPosition = e.clientX - rect.left;
        const clickPercentage = (clickPosition / rect.width) * 100;
        
        const leftThumbPercentage = calculatePercentage(currentValue[0]);
        const rightThumbPercentage = calculatePercentage(currentValue[1]);
        
        // Determinar cuál thumb está más cerca del clic
        if (Math.abs(clickPercentage - leftThumbPercentage) <= Math.abs(clickPercentage - rightThumbPercentage)) {
          thumbIndex = 0;
        } else {
          thumbIndex = 1;
        }
      }
      
      handlePositionChange(e.clientX, thumbIndex);
    };
    
    // Valores para los cálculos de estilo
    const getThumbPositions = () => {
      if (multiple && Array.isArray(currentValue)) {
        return [
          `${calculatePercentage(currentValue[0])}%`,
          `${calculatePercentage(currentValue[1])}%`
        ];
      } else {
        const singleValue = currentValue as number;
        return [`${calculatePercentage(singleValue)}%`];
      }
    };
    
    const thumbPositions = getThumbPositions();
    
    // Calcular el rango seleccionado para mostrarlo
    const rangeStyle = () => {
      if (multiple && Array.isArray(currentValue)) {
        const leftPercentage = calculatePercentage(currentValue[0]);
        const rightPercentage = calculatePercentage(currentValue[1]);
        return {
          left: `${leftPercentage}%`,
          width: `${rightPercentage - leftPercentage}%`
        };
      } else {
        const singleValue = currentValue as number;
        const percentage = calculatePercentage(singleValue);
        return {
          left: 0,
          width: `${percentage}%`
        };
      }
    };
    
    // Generar marcas para el slider
    const renderMarks = () => {
      if (!showMarks) return null;
      
      const marks = [];
      const steps = (max - min) / markInterval;
      
      for (let i = 0; i <= steps; i++) {
        const value = min + i * markInterval;
        if (value <= max) {
          const percentage = calculatePercentage(value);
          marks.push(
            <div
              key={value}
              className="absolute top-0 h-full"
              style={{ left: `${percentage}%` }}
            >
              <div className="absolute bottom-6 translate-x-[-50%] text-xs">
                {value}
              </div>
              <div className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 bg-primary/60" />
            </div>
          );
        }
      }
      
      return marks;
    };
    
    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
      >
        <div 
          ref={trackRef}
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
          onClick={handleTrackClick}
        >
          <div 
            ref={rangeRef}
            className="absolute h-full bg-primary" 
            style={rangeStyle()}
          />
          
          {/* Marcas en el slider */}
          {renderMarks()}
        </div>
        
        {/* Primer thumb */}
        <div
          ref={leftThumbRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={multiple ? (currentValue as [number, number])[1] : max}
          aria-valuenow={multiple ? (currentValue as [number, number])[0] : currentValue as number}
          className={cn(
            "absolute block h-4 w-4 cursor-pointer rounded-full border border-primary/50 bg-background shadow transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:pointer-events-none disabled:opacity-50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ left: thumbPositions[0], transform: 'translateX(-50%)' }}
          onMouseDown={(e) => handleMouseDown(e, 0)}
        >
          {showValues && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-primary px-1 py-0.5 text-xs text-primary-foreground">
              {formatValue(multiple ? (currentValue as [number, number])[0] : currentValue as number)}
            </div>
          )}
        </div>
        
        {/* Segundo thumb (solo en modo múltiple) */}
        {multiple && (
          <div
            ref={rightThumbRef}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-valuemin={(currentValue as [number, number])[0]}
            aria-valuemax={max}
            aria-valuenow={(currentValue as [number, number])[1]}
            className={cn(
              "absolute block h-4 w-4 cursor-pointer rounded-full border border-primary/50 bg-background shadow transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ left: thumbPositions[1], transform: 'translateX(-50%)' }}
            onMouseDown={(e) => handleMouseDown(e, 1)}
          >
            {showValues && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-primary px-1 py-0.5 text-xs text-primary-foreground">
                {formatValue((currentValue as [number, number])[1])}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

// Función para combinar refs
function mergeRefs<T>(...refs: (React.Ref<T> | null | undefined)[]) {
  return (value: T): void => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value;
      }
    });
  };
}

export { Slider };
