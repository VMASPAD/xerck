import React from 'react'
import {Button} from "@/components/ui/button"
import { ArrowRightIcon } from 'lucide-react'

function LayoutHeroV4() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({length: 20}).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-around">
            {Array.from({length: 20}).map((_, colIndex) => (
              <div key={colIndex} className="w-1 h-1 rounded-full bg-primary m-8"></div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="text-center max-w-3xl z-10">
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter">
          Diseña. Construye. <span className="text-primary">Despliega.</span>
        </h1>
        <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
          Componentes elegantes y minimalistas para proyectos web modernos.
          Sin distracciones, solo código de calidad.
        </p>
        <div className="mt-12">
          <Button size="lg" className="text-base rounded-none px-8 py-6 bg-foreground text-background hover:bg-foreground/90">
            Explorar biblioteca <ArrowRightIcon className="ml-2 !h-5 !w-5" />
          </Button>
        </div>
        <div className="mt-16 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-muted-foreground text-sm">Componentes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-muted-foreground text-sm">Usuarios</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">99%</div>
            <div className="text-muted-foreground text-sm">Satisfacción</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeroV4
