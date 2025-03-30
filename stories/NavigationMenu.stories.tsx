import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/NavigationMenu";
import { cn } from "../lib/utils";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Introducción</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Panel de navegación
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Componente de navegación personalizado con indicaciones visuales.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introducción">
                Documentación esencial para empezar con nuestro sistema.
              </ListItem>
              <ListItem href="/docs/installation" title="Instalación">
                Guía paso a paso para integrar nuestros componentes.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Tipografía">
                Estilos y componentes de texto para un diseño consistente.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/docs/primitives/alert-dialog" title="Diálogo de alerta">
                Muestra información crítica que requiere acción del usuario.
              </ListItem>
              <ListItem href="/docs/primitives/hover-card" title="Tarjeta de vista previa">
                Vista previa al pasar el cursor sobre un elemento.
              </ListItem>
              <ListItem href="/docs/primitives/progress" title="Barra de progreso">
                Muestra el progreso de una operación en el tiempo.
              </ListItem>
              <ListItem href="/docs/primitives/scroll-area" title="Área de desplazamiento">
                Contenedor personalizable con barras de desplazamiento.
              </ListItem>
              <ListItem href="/docs/primitives/tabs" title="Pestañas">
                Cambia entre diferentes secciones de contenido.
              </ListItem>
              <ListItem href="/docs/primitives/tooltip" title="Información emergente">
                Muestra información adicional al pasar el cursor.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a 
            className={navigationMenuTriggerStyle()}
            href="/docs"
          >
            Documentación
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/inicio">
            Inicio
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/acerca">
            Acerca de
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/blog">
            Blog
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/contacto">
            Contacto
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithDropdowns: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              <ListItem href="/productos/software" title="Software">
                Soluciones de software para empresas.
              </ListItem>
              <ListItem href="/productos/hardware" title="Hardware">
                Equipos y dispositivos tecnológicos.
              </ListItem>
              <ListItem href="/productos/servicios" title="Servicios">
                Consultoría y servicios profesionales.
              </ListItem>
              <ListItem href="/productos/capacitacion" title="Capacitación">
                Programas de formación y talleres.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              <ListItem href="/recursos/guias" title="Guías">
                Guías prácticas y tutoriales.
              </ListItem>
              <ListItem href="/recursos/plantillas" title="Plantillas">
                Plantillas descargables para proyectos.
              </ListItem>
              <ListItem href="/recursos/webinars" title="Webinars">
                Seminarios web sobre tecnología.
              </ListItem>
              <ListItem href="/recursos/casos" title="Casos de éxito">
                Historias de clientes satisfechos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/soporte">
            Soporte
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
