import * as React from "react";
import { motion, Variants, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils"
import { Card, CardProps } from "./Card";

// Redefiniendo CardProps para incluir propiedades de Framer Motion
type AnimatedCardProps = HTMLMotionProps<"div"> & {
  variant?: "fadeIn" | "hover" | "draggable" | "scroll";
  cardProps?: React.ComponentProps<typeof Card>;
  delay?: number;
  dragConstraints?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
};

// Variantes de animación
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  }
};

const hoverVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const scrollVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

// Componente AnimatedCard
export const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  AnimatedCardProps
>(({ className, variant = "fadeIn", delay = 0, dragConstraints, cardProps = {}, children, ...props }, ref) => {
  // Configurar props basados en la variante seleccionada
  const getVariantProps = () => {
    switch (variant) {
      case "fadeIn":
        return {
          initial: "hidden",
          animate: "visible",
          variants: fadeInVariants,
          transition: { delay }
        };
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover",
          variants: hoverVariants
        };
      case "draggable":
        return {
          drag: true,
          dragConstraints: dragConstraints || { top: 0, right: 0, bottom: 0, left: 0 },
          dragElastic: 0.2,
          whileTap: { scale: 1.02, cursor: "grabbing" },
          initial: { scale: 1 }
        };
      case "scroll":
        return {
          initial: "offscreen",
          whileInView: "onscreen",
          viewport: { once: true, amount: 0.3 },
          variants: scrollVariants
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn("rounded-xl", className)}
      {...getVariantProps()}
      {...props}
    >
      <Card {...cardProps}>
        {children}
      </Card>
    </motion.div>
  );
});

AnimatedCard.displayName = "AnimatedCard";

export { Card };
export * from "./Card";
