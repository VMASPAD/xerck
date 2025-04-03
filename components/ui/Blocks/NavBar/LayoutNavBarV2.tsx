import { Menu, Search, Terminal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV2() {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-0 inset-x-0 h-16 bg-background border-b border-border">
        <div className="h-full flex items-center justify-between mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-3">
            <Terminal className="h-6 w-6" />
            <span className="font-semibold hidden md:block">XerckUI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-primary hover:text-primary/80">Home</a>
            <a href="#" className="hover:text-primary">Features</a>
            <a href="#" className="hover:text-primary">Pricing</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="rounded-full p-2 md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full p-2 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="outline" className="hidden md:flex rounded-full">Sign In</Button>
            <Button size="sm" className="hidden md:flex rounded-full">Register</Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LayoutNavBarV2
