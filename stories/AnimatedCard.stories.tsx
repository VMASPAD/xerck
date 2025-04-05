import { Meta, StoryObj } from "@storybook/react";
import { AnimatedCard } from "../components/ui/AnimatedCard";
import { CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";

const meta = {
  title: "Components/AnimatedCard",
  component: AnimatedCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["fadeIn", "hover", "draggable", "scroll"],
      description: "Tipo de animación para la tarjeta"
    },
    delay: {
      control: { type: "number" },
      description: "Retardo de la animación en segundos"
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof AnimatedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeInCard: Story = {
  args: {
    variant: "fadeIn",
    delay: 0.2,
  },
  render: (args) => (
    <AnimatedCard 
      variant={args.variant} 
      delay={args.delay}
      cardProps={{ className: "w-[350px]" }}
    >
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
    </AnimatedCard>
  ),
};

export const HoverCard: Story = {
  args: {
    variant: "hover",
  },
  render: (args) => (
    <AnimatedCard 
      variant={args.variant}
      cardProps={{ className: "w-[350px]" }}
    >
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
    </AnimatedCard>
  ),
};

export const DraggableCard: Story = {
  args: {
    variant: "draggable",
  },
  render: (args) => (
    <div className="h-[400px] w-[400px] border border-dashed border-gray-300 relative flex items-center justify-center">
      <AnimatedCard 
        variant={args.variant}
        dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
        cardProps={{ className: "w-[250px] cursor-grab" }}
      >
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
      </AnimatedCard>
    </div>
  ),
};

export const ScrollRevealCards: Story = {
  args: {
    variant: "scroll",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="w-full p-8 space-y-96">
      <div className="h-96 flex items-end justify-center">
        <p className="text-muted-foreground">↓ Desplázate hacia abajo ↓</p>
      </div>
      
      <AnimatedCard 
        variant={args.variant}
        cardProps={{ className: "w-[350px] mx-auto" }}
      >
        <CardHeader>
          <CardTitle>Revelación al Scroll</CardTitle>
          <CardDescription>Aparece al hacer scroll</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta tarjeta se revela cuando entra en el viewport durante el scroll.</p>
        </CardContent>
      </AnimatedCard>
      
      <AnimatedCard 
        variant={args.variant}
        cardProps={{ className: "w-[350px] mx-auto" }}
      >
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
      </AnimatedCard>
      
      <div className="h-40"></div>
    </div>
  ),
};

export const MultipleAnimatedCards: Story = {
  parameters: {
    layout: "centered",
  },
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      {[0, 1, 2].map((i) => (
        <AnimatedCard 
          key={i}
          variant="fadeIn" 
          delay={i * 0.2}
          cardProps={{ className: "w-[250px]" }}
        >
          <CardHeader>
            <CardTitle>Tarjeta {i + 1}</CardTitle>
            <CardDescription>Secuencia de animación</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Parte de una secuencia de tarjetas que aparecen con un retardo escalonado.</p>
          </CardContent>
        </AnimatedCard>
      ))}
    </div>
  ),
};
