import React from 'react'
import {Button} from "@/components/ui/button"
import { ArrowRightIcon, CheckIcon } from 'lucide-react'

function LayoutHeroV6() {
  const features = [
    'Componentes accesibles',
    'Temas personalizables',
    'Documentación detallada',
    'Actualizaciones regulares'
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-card">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
        <div className="lg:col-span-3 flex flex-col justify-center">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Plataforma Empresarial
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-foreground">
            Soluciones UI para equipos profesionales
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Framework de componentes diseñado para satisfacer las necesidades de
            aplicaciones empresariales modernas con enfoque en escalabilidad.
          </p>
          
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-muted-foreground">
                <CheckIcon className="h-5 w-5 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-10">
            <Button size="lg" className="rounded-md text-base bg-primary hover:bg-primary/90">
              Solicitar demostración <ArrowRightIcon className="ml-2 !h-4 !w-4" />
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-2 flex items-center justify-center">
          <div className="w-full bg-background rounded-xl p-6 shadow-lg border border-border">
            <div className="text-xl font-semibold mb-4">Iniciar proyecto</div>
            <div className="space-y-4">
              <div className="h-12 rounded-md bg-muted/40"></div>
              <div className="h-12 rounded-md bg-muted/40"></div>
              <div className="h-12 rounded-md bg-muted/40"></div>
              <Button className="w-full">Comenzar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeroV6
