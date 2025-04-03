import React from 'react'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/Badge"
import { ArrowUpRight, Sparkles } from 'lucide-react'

function LayoutHeroV5() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 w-[200%] h-[40rem] left-0 bg-primary/20 rounded-[100%] animate-[spin_15s_linear_infinite]"></div>
        <div className="absolute top-1/3 w-[200%] h-[30rem] left-0 bg-accent/10 rounded-[100%] animate-[spin_10s_linear_infinite]"></div>
      </div>
      
      <Badge className="bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-full py-1 px-4 mb-6">
        <Sparkles className="mr-2 h-4 w-4" /> Nuevo diseño en línea
      </Badge>
      
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
        Interfaces de usuario <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">intuitivas y elegantes</span>
      </h1>
      
      <p className="mt-6 text-center text-lg md:text-xl text-muted-foreground max-w-xl">
        Componentes adaptables que transforman tu experiencia de desarrollo.
        Construye más rápido con menos código.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="rounded-full text-base px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90">
          Probar ahora <ArrowUpRight className="ml-2 !h-5 !w-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full text-base border-2"
        >
          Ver ejemplos
        </Button>
      </div>
      
      <div className="mt-16 flex items-center justify-center">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
          ))}
        </div>
        <div className="ml-4 text-muted-foreground">+2500 desarrolladores</div>
      </div>
    </div>
  )
}

export default LayoutHeroV5
