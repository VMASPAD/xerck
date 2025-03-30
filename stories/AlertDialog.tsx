"use client"

import React, { useState, useEffect, useRef } from 'react';
import "../app/globals.css";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AlertDialogProps {
  /** Título del diálogo de alerta */
  title: string;
  /** Descripción del diálogo de alerta */
  description: string;
  /** Texto del botón de confirmación */
  actionLabel: string;
  /** Texto del botón de cancelación */
  cancelLabel: string;
  /** Texto del botón que abre el diálogo */
  triggerLabel?: string;
  /** Variante del botón de acción */
  actionVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Variante del botón de cancelación */
  cancelVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Variante del botón que abre el diálogo */
  triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Estado inicial del diálogo (abierto/cerrado) */
  defaultOpen?: boolean;
  /** Función que se ejecuta cuando se confirma la acción */
  onConfirm?: () => void;
  /** Función que se ejecuta cuando se cancela la acción */
  onCancel?: () => void;
  /** Elemento personalizado para abrir el diálogo */
  trigger?: React.ReactNode;
}

const AlertDialog = ({
  title = "¿Estás absolutamente seguro?",
  description = "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.",
  actionLabel = "Continuar",
  cancelLabel = "Cancelar",
  triggerLabel = "Abrir diálogo",
  actionVariant = "default",
  cancelVariant = "outline",
  triggerVariant = "outline",
  defaultOpen = false,
  onConfirm = () => {},
  onCancel = () => {},
  trigger
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Efecto para gestionar el montaje del componente
  useEffect(() => {
    setIsMounted(true);
    
    // Solo abrimos el diálogo por defecto si explícitamente se indica
    if (defaultOpen) {
      setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
        document.body.style.overflow = 'hidden';
      }, 100);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [defaultOpen]);

  // Manejo del clic fuera del diálogo para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Manejo de tecla ESC para cerrar el diálogo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    // Pequeño retraso para que la animación funcione correctamente
    setTimeout(() => setIsAnimating(true), 10);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
      onCancel();
    }, 300);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
      onConfirm();
    }, 300);
  };

  return (
    <>
      {/* Botón para abrir el diálogo */}
      {trigger ? (
        <div className="cursor-pointer" onClick={handleOpen}>{trigger}</div>
      ) : (
        <Button variant={triggerVariant} onClick={handleOpen}>
          {triggerLabel}
        </Button>
      )}
      
      {/* El diálogo modal */}
      {isOpen && isMounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay/Backdrop con animación */}
          <div 
            className={cn(
              "fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300",
              isAnimating ? "opacity-100" : "opacity-0"
            )}
            onClick={handleClose}
            aria-hidden="true"
          />
          
          {/* Dialog Content con animaciones mejoradas */}
          <div 
            ref={dialogRef}
            className={cn(
              "fixed z-50 w-full max-w-md p-6 rounded-lg bg-background shadow-xl border transition-all duration-300 ease-out",
              isAnimating 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-8 scale-95",
              "animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
            )}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            data-state={isAnimating ? "open" : "closed"}
          >
            {/* Header con animación secuencial */}
            <div className={cn(
              "mb-5 transition-all duration-300 ease-out delay-75",
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}>
              <h2 
                id="alert-dialog-title"
                className="text-lg font-semibold text-foreground"
              >
                {title}
              </h2>
              <p 
                id="alert-dialog-description"
                className={cn(
                  "text-sm text-muted-foreground mt-2 transition-all duration-300 ease-out delay-150",
                  isAnimating ? "opacity-100" : "opacity-0"
                )}
              >
                {description}
              </p>
            </div>

            {/* Footer/Buttons con animación secuencial */}
            <div className={cn(
              "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-6 transition-all duration-300 ease-out delay-200",
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <Button 
                variant={cancelVariant}
                onClick={handleClose}
                className="mt-2 sm:mt-0 focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {cancelLabel}
              </Button>
              <Button 
                variant={actionVariant}
                onClick={handleConfirm}
                className="focus-visible:ring-2 focus-visible:ring-offset-2"
                autoFocus
              >
                {actionLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertDialog;
