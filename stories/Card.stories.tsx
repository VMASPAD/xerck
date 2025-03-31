import { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/Card";  
import { Button } from "../components/ui/button";

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