import { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import React from "react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="cuenta" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
        <TabsTrigger value="contraseña">Contraseña</TabsTrigger>
      </TabsList>
      <TabsContent value="cuenta" className="p-4 border rounded-lg mt-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ajustes de la cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Configura las preferencias de tu cuenta. Esta información será visible para otros usuarios.
          </p>
          <div className="grid gap-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre
              </label>
              <input 
                id="name" 
                className="w-full px-3 py-2 border rounded-md text-sm" 
                placeholder="Tu nombre" 
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Nombre de usuario
              </label>
              <input 
                id="username" 
                className="w-full px-3 py-2 border rounded-md text-sm" 
                placeholder="@username" 
              />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="contraseña" className="p-4 border rounded-lg mt-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cambiar contraseña</h3>
          <p className="text-sm text-muted-foreground">
            Actualiza tu contraseña para mejorar la seguridad de tu cuenta.
          </p>
          <div className="grid gap-2">
            <div className="space-y-1">
              <label htmlFor="current" className="text-sm font-medium">
                Contraseña actual
              </label>
              <input 
                id="current" 
                type="password" 
                className="w-full px-3 py-2 border rounded-md text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="new" className="text-sm font-medium">
                Nueva contraseña
              </label>
              <input 
                id="new" 
                type="password" 
                className="w-full px-3 py-2 border rounded-md text-sm" 
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("tab1");
    
    return (
      <div className="space-y-6 w-[400px]">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab("tab1")}
            className="px-3 py-1 border rounded-md text-sm font-medium"
          >
            Activar Tab 1
          </button>
          <button 
            onClick={() => setActiveTab("tab2")}
            className="px-3 py-1 border rounded-md text-sm font-medium"
          >
            Activar Tab 2
          </button>
          <button 
            onClick={() => setActiveTab("tab3")}
            className="px-3 py-1 border rounded-md text-sm font-medium"
          >
            Activar Tab 3
          </button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-lg mt-2">
            <div className="space-y-2">
              <h3 className="font-medium">Contenido Tab 1</h3>
              <p className="text-sm text-muted-foreground">
                Este es el contenido del Tab 1. Este tab está controlado externamente.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-lg mt-2">
            <div className="space-y-2">
              <h3 className="font-medium">Contenido Tab 2</h3>
              <p className="text-sm text-muted-foreground">
                Este es el contenido del Tab 2. Puedes cambiar entre tabs usando los botones.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-lg mt-2">
            <div className="space-y-2">
              <h3 className="font-medium">Contenido Tab 3</h3>
              <p className="text-sm text-muted-foreground">
                Este es el contenido del Tab 3. El estado se gestiona desde fuera del componente Tabs.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Tabs defaultValue="mensajes" className="w-[400px]">
      <TabsList className="flex rounded-full bg-secondary p-1">
        <TabsTrigger 
          value="mensajes" 
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Mensajes
        </TabsTrigger>
        <TabsTrigger 
          value="notificaciones" 
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Notificaciones
        </TabsTrigger>
        <TabsTrigger 
          value="ajustes" 
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Ajustes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mensajes" className="p-4 border rounded-lg mt-4">
        <h3 className="font-medium">Mensajes</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona tus mensajes y conversaciones.
        </p>
      </TabsContent>
      <TabsContent value="notificaciones" className="p-4 border rounded-lg mt-4">
        <h3 className="font-medium">Notificaciones</h3>
        <p className="text-sm text-muted-foreground">
          Configura tus preferencias de notificaciones.
        </p>
      </TabsContent>
      <TabsContent value="ajustes" className="p-4 border rounded-lg mt-4">
        <h3 className="font-medium">Ajustes</h3>
        <p className="text-sm text-muted-foreground">
          Personaliza la configuración de tu cuenta.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="activo" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="activo">Activo</TabsTrigger>
        <TabsTrigger value="pendiente">Pendiente</TabsTrigger>
        <TabsTrigger value="bloqueado" disabled>Bloqueado</TabsTrigger>
      </TabsList>
      <TabsContent value="activo" className="p-4 border rounded-lg mt-2">
        <h3 className="font-medium">Usuarios Activos</h3>
        <p className="text-sm text-muted-foreground">
          Lista de usuarios actualmente activos en el sistema.
        </p>
      </TabsContent>
      <TabsContent value="pendiente" className="p-4 border rounded-lg mt-2">
        <h3 className="font-medium">Usuarios Pendientes</h3>
        <p className="text-sm text-muted-foreground">
          Lista de usuarios pendientes de aprobación.
        </p>
      </TabsContent>
      <TabsContent value="bloqueado" className="p-4 border rounded-lg mt-2">
        <h3 className="font-medium">Usuarios Bloqueados</h3>
        <p className="text-sm text-muted-foreground">
          Lista de usuarios bloqueados (acceso restringido).
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex space-x-6 w-[500px]">
      <Tabs defaultValue="general" orientation="vertical">
        <TabsList className="flex flex-col w-[200px] space-y-1 bg-transparent p-0">
          <TabsTrigger 
            value="general" 
            className="justify-start px-4 py-2 w-full data-[state=active]:bg-muted"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="privacidad" 
            className="justify-start px-4 py-2 w-full data-[state=active]:bg-muted"
          >
            Privacidad
          </TabsTrigger>
          <TabsTrigger 
            value="notificaciones" 
            className="justify-start px-4 py-2 w-full data-[state=active]:bg-muted"
          >
            Notificaciones
          </TabsTrigger>
          <TabsTrigger 
            value="avanzado" 
            className="justify-start px-4 py-2 w-full data-[state=active]:bg-muted"
          >
            Avanzado
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="general" className="p-4 border rounded-lg mt-0">
            <h3 className="font-medium">Configuración General</h3>
            <p className="text-sm text-muted-foreground">
              Ajusta la configuración general de tu cuenta.
            </p>
          </TabsContent>
          <TabsContent value="privacidad" className="p-4 border rounded-lg mt-0">
            <h3 className="font-medium">Privacidad</h3>
            <p className="text-sm text-muted-foreground">
              Controla quién puede ver tu información.
            </p>
          </TabsContent>
          <TabsContent value="notificaciones" className="p-4 border rounded-lg mt-0">
            <h3 className="font-medium">Notificaciones</h3>
            <p className="text-sm text-muted-foreground">
              Configura cómo y cuándo recibir alertas.
            </p>
          </TabsContent>
          <TabsContent value="avanzado" className="p-4 border rounded-lg mt-0">
            <h3 className="font-medium">Configuración Avanzada</h3>
            <p className="text-sm text-muted-foreground">
              Opciones para usuarios avanzados.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
};
