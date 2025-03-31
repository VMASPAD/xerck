import React, { ButtonHTMLAttributes } from 'react';
import "../../app/globals.css"; 

export interface ButtonProps {
  /** Which variant style to use */
  variant?: 'normal' | 'secondary' | 'outline' | 'danger' | 'success' | 'info' | 'warning' | 'ghost' | 'link' | 'subtle';
  /** Custom style class (optional) */
  style?: string;
  /** Button contents */
  label?: string; 
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  normal: "bg-primary text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  secondary: "bg-secondary text-foreground hover:bg-secondary/90 hover:ring-2 hover:ring-secondary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  danger: "bg-destructive text-primary-foreground hover:ring-2 hover:ring-destructive hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  
  // New variants
  success: "bg-green-600 text-white hover:bg-green-700 hover:ring-2 hover:ring-green-600 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  info: "bg-blue-500 text-white hover:bg-blue-600 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  warning: "bg-amber-500 text-white hover:bg-amber-600 hover:ring-2 hover:ring-amber-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",
  ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground text-sm transform-gpu transition-all duration-300 ease-out",
  link: "bg-transparent text-primary underline-offset-4 hover:underline text-sm transform-gpu transition-all duration-300 ease-out p-0 shadow-none",
  subtle: "bg-primary/10 text-primary hover:bg-primary/20 text-sm transform-gpu transition-all duration-300 ease-out",
 };

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 py-2 text-sm",
  lg: "h-11 px-6 py-2 text-base"
};

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'normal',
  style,
  label,
  children,
  className,
  disabled = false,
  size = 'md',
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  
  return (
    <button
      type="button"
      className={[
        style || variantStyle, 
        sizeStyle,
        className,
        "cursor-pointer font-[Geist] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
     {label}{children}
    </button>
  );
};
