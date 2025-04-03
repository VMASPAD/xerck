import React from 'react'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/Badge"
import { ArrowUpRight, ArrowRightIcon } from 'lucide-react'

function LayoutHeroV3() {
  return (
    <div className="min-h-screen flex items-center px-6 bg-background">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit bg-secondary text-secondary-foreground rounded-md py-1 px-3">
            Innovando desde 2023
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Componentes <span className="text-primary">potentes</span> para tus proyectos
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Acelera tu flujo de trabajo con componentes listos para usar y personalizables.
            Ideal para startups y proyectos empresariales.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button size="lg" className="text-base rounded-md">
              Comenzar <ArrowUpRight className="ml-2 !h-5 !w-5" />
            </Button>
            <Button
              variant="link"
              size="lg"
              className="text-base px-0"
            >
              Ver documentación <ArrowRightIcon className="ml-2 !h-4 !w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
            <div className="absolute inset-4 bg-card rounded-xl shadow-2xl flex items-center justify-center">
              <div className="text-4xl font-bold">UI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeroV3
