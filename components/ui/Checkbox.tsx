"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Clases adicionales para personalizar el checkbox
   */
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked || false);
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Manejar el cambio interno y llamar al controlador de eventos externo si existe
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.checked === undefined) {
        setChecked(e.target.checked);
      }
      props.onChange?.(e);
    };

    // Usar el estado controlado si se proporciona la prop checked
    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked);
      }
    }, [props.checked]);

    const isChecked = props.checked !== undefined ? props.checked : checked;

    // Simplificar - permitir que el label haga todo el trabajo
    return (
      <label 
        className="relative inline-flex items-center cursor-pointer select-none"
      >
        <input
          {...props}
          type="checkbox"
          ref={node => {
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
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-all duration-200 ease-in-out",
            isChecked ? "bg-primary text-primary-foreground" : "bg-transparent",
            props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            className
          )}
          // Eliminar el onClick personalizado para permitir que trabaje el comportamiento nativo
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
