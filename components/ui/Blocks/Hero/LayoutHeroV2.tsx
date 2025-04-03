import React from 'react'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/Badge"
import { ArrowUpRight, CirclePlay } from 'lucide-react'

function LayoutHeroV2() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background to-muted relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="text-center max-w-3xl z-10">
        <Badge className="bg-accent text-accent-foreground rounded-full py-1 border-none">
          Experiencia Premium
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl md:leading-[1.1] font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
          Diseños Modernos con Shadcn UI
        </h1>
        <p className="mt-6 text-[17px] md:text-xl text-muted-foreground">
          Construye interfaces de usuario elegantes y responsivas con nuestros componentes
          personalizados basados en Shadcn UI.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          <Button size="lg" className="rounded-full text-base bg-primary hover:bg-primary/90">
            Explorar Componentes <ArrowUpRight className="ml-2 !h-5 !w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full text-base"
          >
            <CirclePlay className="mr-2 !h-5 !w-5" /> Ver Tutoriales
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeroV2
