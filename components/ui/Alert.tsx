import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Terminal } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: 
          "border-green-500/50 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950/50 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: 
          "border-blue-500/50 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning: 
          "border-amber-500/50 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-950/50 dark:text-amber-400 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        secondary: 
          "border-secondary/50 bg-secondary/10 text-secondary-foreground dark:border-secondary [&>svg]:text-secondary-foreground",
        outline: 
          "border-2 bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps extends 
  React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, description, icon, children, ...props }, ref) => {
    // Si hay propiedades de título, descripción o icono, construye el contenido
    const hasProvidedProps = title || description || icon;
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {hasProvidedProps ? (
          <>
            <Terminal className="h-4 w-4" />
            {icon}
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && <AlertDescription>{description}</AlertDescription>}
          </>
        ) : (
          children
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"


export { Alert, AlertTitle, AlertDescription }
