import { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/Card";  
import { Button } from "../components/ui/button";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import * as React from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

// Definición de tipos y variantes para tarjetas animadas
type AnimatedCardProps = {
  variant?: "fadeIn" | "hover" | "draggable" | "scroll";
  delay?: number;
  dragConstraints?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  className?: string;
  children: React.ReactNode;
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

// Nuevas variantes de animación
const flipVariants: Variants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const pulseVariants: Variants = {
  initial: { scale: 1, boxShadow: "0 0 0 rgba(66, 153, 225, 0)" },
  pulse: {
    scale: [1, 1.02, 1],
    boxShadow: [
      "0 0 0 rgba(66, 153, 225, 0)",
      "0 0 20px rgba(66, 153, 225, 0.5)",
      "0 0 0 rgba(66, 153, 225, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const expandVariants: Variants = {
  collapsed: { 
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: { 
      duration: 0.4,
      ease: "easeInOut" 
    } 
  },
  expanded: { 
    height: "auto",
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: "easeInOut" 
    } 
  }
};

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.4 }
  })
};

// Componente AnimatedCard dentro del archivo stories
const AnimatedCard = ({ 
  variant = "fadeIn",
  delay = 0,
  dragConstraints,
  className,
  children
}: AnimatedCardProps) => {
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
      className={cn("rounded-xl", className)}
      {...getVariantProps()}
    >
      {children}
    </motion.div>
  );
};

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenido de la tarjeta que muestra información importante.</p>
      </CardContent>
      <CardFooter>
        <p>Pie de la tarjeta</p>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Solo encabezado</CardTitle>
        <CardDescription>Una tarjeta sin pie de página</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Esta tarjeta no incluye un componente CardFooter.</p>
      </CardContent>
    </Card>
  ),
};

export const OnlyContent: Story = {
  render: (args) => (
    <Card className="w-[350px] p-6" {...args}>
      <p>Una tarjeta simple con solo contenido sin usar subcomponentes.</p>
    </Card>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Tarjeta con acciones</CardTitle>
        <CardDescription>Ejemplo con botones interactivos</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Esta tarjeta incluye botones en el pie de página para realizar acciones.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="danger">
          Cancelar
        </Button>
        <Button >
          Confirmar
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Card className="w-[350px] overflow-hidden" {...args}>
      <div className="h-[200px] bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Imagen (200x200)
        </div>
      </div>
      <CardHeader>
        <CardTitle>Tarjeta con imagen</CardTitle>
        <CardDescription>Incluye una imagen destacada</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Esta tarjeta tiene una imagen destacada en la parte superior.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Publicado el 12 de mayo, 2023</p>
      </CardFooter>
    </Card>
  ),
};

export const CustomBorder: Story = {
  render: (args) => (
    <Card 
      className="w-[350px] border-l-4 border-l-blue-500" 
      {...args}
    >
      <CardHeader>
        <CardTitle>Borde personalizado</CardTitle>
        <CardDescription>Un estilo visual distinto</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Esta tarjeta tiene un borde izquierdo de color personalizado para 
           resaltar contenido importante o categorizar visualmente.</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Personalización avanzada</p>
      </CardFooter>
    </Card>
  ),
};

// Historias adicionales para tarjetas animadas
export const FadeInCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Una tarjeta con animación de aparición gradual (fade-in). La tarjeta aparece con una suave animación de desvanecimiento y movimiento ascendente.'
      },
    },
  },
  render: (args) => (
    <AnimatedCard variant="fadeIn" delay={0.2}>
      <Card className="w-[350px]" {...args}>
        <CardHeader>
          <CardTitle>Tarjeta Animada</CardTitle>
          <CardDescription>Aparece con efecto fade-in</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta tarjeta aparece con una suave animación de desvanecimiento y movimiento ascendente.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ver más</Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  ),
};

export const HoverCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Una tarjeta interactiva que reacciona al pasar el cursor por encima con un efecto de elevación y escala.'
      },
    },
  },
  render: (args) => (
    <AnimatedCard variant="hover">
      <Card className="w-[350px]" {...args}>
        <CardHeader>
          <CardTitle>Tarjeta Interactiva</CardTitle>
          <CardDescription>Pasa el cursor por encima</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta tarjeta reacciona al pasar el cursor por encima con un efecto de elevación y escala.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Interactúa conmigo</Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  ),
};

export const DraggableCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Una tarjeta que puede arrastrarse libremente dentro de límites definidos. Útil para interfaces interactivas.'
      },
    },
  },
  render: (args) => (
    <div className="h-[400px] w-[400px] border border-dashed border-gray-300 relative flex items-center justify-center">
      <AnimatedCard 
        variant="draggable"
        dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
      >
        <Card className="w-[250px] cursor-grab" {...args}>
          <CardHeader> 
            <CardTitle>Tarjeta Arrastrable</CardTitle>
            <CardDescription>Arrástrala con el ratón</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Esta tarjeta puede arrastrarse libremente dentro de los límites definidos.</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">¡Prueba a arrastrarme!</p>
          </CardFooter>
        </Card>
      </AnimatedCard>
    </div>
  ),
};

export const ScrollRevealCards: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: 'Tarjetas que se revelan al hacer scroll. Útil para crear efectos atractivos en páginas largas.'
      },
    },
  },
  render: (args) => (
    <div className="w-full p-8 space-y-96">
      <div className="h-96 flex items-end justify-center">
        <p className="text-muted-foreground">↓ Desplázate hacia abajo ↓</p>
      </div>
      
      <AnimatedCard variant="scroll">
        <Card className="w-[350px] mx-auto" {...args}>
          <CardHeader>
            <CardTitle>Revelación al Scroll</CardTitle>
            <CardDescription>Aparece al hacer scroll</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Esta tarjeta se revela cuando entra en el viewport durante el scroll.</p>
          </CardContent>
        </Card>
      </AnimatedCard>
      
      <AnimatedCard variant="scroll">
        <Card className="w-[350px] mx-auto" {...args}>
          <CardHeader>
            <CardTitle>Otra Tarjeta con Scroll</CardTitle>
            <CardDescription>Sigue desplazándote</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Las tarjetas aparecen una tras otra a medida que haces scroll en la página.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Acción secundaria</Button>
            <Button className="ml-auto">Acción principal</Button>
          </CardFooter>
        </Card>
      </AnimatedCard>
      
      <div className="h-40"></div>
    </div>
  ),
};

export const MultipleAnimatedCards: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secuencia de tarjetas animadas que aparecen con un retardo escalonado. Ideal para mostrar listas o colecciones.'
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      {[0, 1, 2].map((i) => (
        <AnimatedCard key={i} variant="fadeIn" delay={i * 0.2}>
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Tarjeta {i + 1}</CardTitle>
              <CardDescription>Secuencia de animación</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Parte de una secuencia de tarjetas que aparecen con un retardo escalonado.</p>
            </CardContent>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  ),
};

export const FlipCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tarjeta que se voltea para mostrar contenido en ambas caras. Útil para comparaciones, antes/después o información adicional.'
      },
    },
  },
  render: () => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    
    return (
      <div className="perspective-1000 w-[350px] h-[350px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className="relative w-full h-full">
          <motion.div 
            className="absolute w-full h-full backface-hidden"
            variants={flipVariants}
            animate={isFlipped ? "back" : "front"}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle>Frontal</CardTitle>
                <CardDescription>Haz clic para voltear</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>Esto es el contenido frontal de la tarjeta. Haz clic en cualquier lugar para ver el reverso.</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Parte delantera</p>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            className="absolute w-full h-full backface-hidden"
            variants={flipVariants}
            initial={{ rotateY: 180 }}
            animate={isFlipped ? "front" : "back"}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Card className="w-full h-full flex flex-col bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Reverso</CardTitle>
                <CardDescription className="text-primary-foreground/70">Haz clic para volver</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>Aquí tienes información adicional que estaba oculta en el reverso de la tarjeta.</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-primary-foreground/70">Parte trasera</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  },
};

export const PulseCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tarjeta con efecto de pulso para destacar información importante o llamar la atención del usuario.'
      },
    },
  },
  render: (args) => (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate="pulse"
    >
      <Card className="w-[350px] border-blue-400" {...args}>
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="text-blue-600 dark:text-blue-300">Información Destacada</CardTitle>
          <CardDescription>Contenido importante que requiere atención</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Notificación importante</p>
              <p className="text-sm text-muted-foreground">Actualización del sistema</p>
            </div>
          </div>
          <p>Esta tarjeta utiliza un efecto de pulso sutil para atraer la atención del usuario hacia información crítica o urgente.</p>
        </CardContent>
        <CardFooter className="bg-blue-50 dark:bg-blue-900/20">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Entendido
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  ),
};

export const ExpandableCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tarjeta que se expande para mostrar contenido adicional. Ideal para FAQs o secciones con información detallada opcional.'
      },
    },
  },
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    return (
      <Card className="w-[350px]">
        <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex justify-between items-center">
            <CardTitle>Pregunta Frecuente</CardTitle>
            <ArrowDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </div>
          <CardDescription>¿Cómo funciona este componente?</CardDescription>
        </CardHeader>
        
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={expandVariants}
            >
              <CardContent>
                <p className="mb-4">Esta tarjeta se expande y contrae suavemente para mostrar u ocultar contenido adicional cuando el usuario interactúa con ella.</p>
                <p className="mb-4">Es perfecta para secciones de preguntas frecuentes, términos y condiciones, o cualquier información detallada que no necesita estar visible permanentemente.</p>
                <p>El componente utiliza AnimatePresence de Framer Motion para manejar elegantemente la entrada y salida del contenido expandido.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsExpanded(false)}>
                  Cerrar
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  },
};

export const CarouselCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Presentación de varias tarjetas en un carrusel automático. Perfecto para mostrar testimonios, características o productos destacados.'
      },
    },
  },
  render: () => {
    // Extraer la lógica a un componente React válido para usar Hooks
    const CarouselComponent = () => {
      const [[page, direction], setPage] = React.useState([0, 0]);
      const items = [
        {
          title: "Testimonios de Clientes",
          description: "Lo que dicen nuestros usuarios",
          content: "\"Esta plataforma ha transformado completamente nuestra forma de trabajar. La interfaz es intuitiva y las funcionalidades son exactamente lo que necesitábamos.\"",
          footer: "María G. - Directora de Operaciones"
        },
        {
          title: "Funcionalidad Destacada",
          description: "Novedades de la versión 2.0",
          content: "El nuevo panel de estadísticas permite visualizar todos los KPIs relevantes en tiempo real, con gráficos personalizables y alertas configurables.",
          footer: "Actualizado hace 2 semanas"
        },
        {
          title: "Premios y Reconocimientos",
          description: "Excelencia en diseño UI/UX",
          content: "Nuestra plataforma ha sido reconocida como una de las interfaces más accesibles y bien diseñadas del año en los premios Design Excellence 2023.",
          footer: "Diciembre 2023"
        }
      ];
      
      const itemIndex = React.useMemo(() => {
        return Math.abs(page % items.length);
      }, [page, items.length]);
      
      const paginate = React.useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
      }, [page]);
      
      React.useEffect(() => {
        const interval = setInterval(() => {
          paginate(1);
        }, 5000);
        
        return () => clearInterval(interval);
      }, [paginate]);
      
      return (
        <div className="relative w-[350px]">
          <div className="absolute -left-10 inset-y-0 flex items-center z-10">
            <button 
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20"
            >
              <ArrowLeft  className="h-5 w-5" />
            </button>
          </div>
          
          <div className="h-[300px] relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{items[itemIndex].title}</CardTitle>
                    <CardDescription>{items[itemIndex].description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{items[itemIndex].content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{items[itemIndex].footer}</p>
                    <div className="flex space-x-1">
                      {items.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-2 w-2 rounded-full ${
                            i === itemIndex ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="absolute -right-10 inset-y-0 flex items-center z-10">
            <button 
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      );
    };
    
    return <CarouselComponent />;
  },
};