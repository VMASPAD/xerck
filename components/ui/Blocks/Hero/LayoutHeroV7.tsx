import React from 'react'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/Badge"
import { ArrowUpRight, Star } from 'lucide-react'

function LayoutHeroV7() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-muted/30 relative">
      {/* Abstract decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto flex flex-col items-center text-center z-10">
        <Badge className="bg-secondary text-secondary-foreground rounded-lg py-1 px-4 mb-4">
          <Star className="mr-1 h-3 w-3 fill-current" /> Valoración 4.9/5
        </Badge>
        
        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          <span className="inline-block bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">Impulsa tu visión</span>
          <span className="block bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent mt-2">con componentes premium</span>
        </h1>
        
        <p className="mt-8 text-xl text-muted-foreground max-w-2xl">
          Una biblioteca de componentes UI diseñada para ayudarte a construir
          interfaces de usuario excepcionales con velocidad y precisión.
        </p>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Button size="lg" className="rounded-md text-base bg-foreground text-background hover:bg-foreground/90 min-w-[180px]">
            Empezar gratis <ArrowUpRight className="ml-2 !h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-md text-base border-2 min-w-[180px]"
          >
            Ver planes Pro
          </Button>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {['Instalación sencilla', 'Diseño responsivo', 'Personalizable', 'Soporte 24/7'].map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-card rounded-full shadow-sm mb-4">
                <span className="font-bold text-xl text-primary">{index + 1}</span>
              </div>
              <div className="font-medium">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LayoutHeroV7
