"use client"

import * as React from "react"
import { Check } from "lucide-react"

// Función de utilidad para combinar clases
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Clases adicionales para personalizar el checkbox
   */
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = useState(props.defaultChecked || false);
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Manejar el cambio interno y llamar al controlador de eventos externo si existe
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.checked === undefined) {
        setChecked(e.target.checked);
      }
      props.onChange?.(e);
    };

    // Manejar el clic en el contenedor personalizado
    const handleClick = (e: React.MouseEvent) => {
      if (!props.disabled) {
        // Detener la propagación para evitar interferencias
        e.stopPropagation();
        
        // Simular clic en el input real
        const input = internalRef.current;
        if (input) {
          input.click();
          input.focus();
        }
      }
    };

    // Usar el estado controlado si se proporciona la prop checked
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);

    const isChecked = props.checked !== undefined ? props.checked : checked;

    return (
      <label 
        className="relative inline-flex items-center cursor-pointer select-none" 
        onClick={(e) => e.stopPropagation()}
      >
        <input
          {...props}
          type="checkbox"
          ref={(node) => {
            // Manejar el ref interno
            internalRef.current = node;
            
            // Manejar el ref externo
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className="sr-only" // Oculto visualmente pero accesible
          checked={isChecked}
          onChange={handleChange}
        />
        <div
          role="presentation"
          onClick={handleClick}
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all duration-200 ease-in-out",
            isChecked ? "bg-primary text-primary-foreground" : "bg-transparent",
            props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            className
          )}
          aria-hidden="true"
        >
          <span className={cn(
            "flex items-center justify-center text-current transition-transform duration-200",
            isChecked ? "scale-100" : "scale-0"
          )}>
            <Check className="h-4 w-4" />
          </span>
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
