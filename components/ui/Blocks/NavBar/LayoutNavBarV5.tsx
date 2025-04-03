import { Menu, Search, Terminal, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV5() {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-4 inset-x-0 mx-auto max-w-6xl bg-background/60 backdrop-blur-lg border border-border/30 rounded-2xl h-14 z-50 px-4">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-primary/70 p-1.5 rounded-md">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wide">
            <a href="#" className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="hover:text-primary transition-colors">Products</a>
            <a href="#" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="rounded-full h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full h-8 w-8">
              <User className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LayoutNavBarV5
