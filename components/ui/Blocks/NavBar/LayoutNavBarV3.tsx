import { Bell, Menu, Search, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV3() {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-0 inset-x-0 h-20 bg-background/80 backdrop-blur-md border-b border-border/40 z-50">
        <div className="h-full flex items-center justify-between mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-md">
              <Terminal className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Xerck</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            <a href="#" className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">Home</a>
            <a href="#" className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">Products</a>
            <a href="#" className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">Services</a>
            <a href="#" className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">Resources</a>
            <a href="#" className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">Contact</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="sm" className="rounded-full px-6 hidden md:flex">Get Started</Button>
            <Button size="sm" variant="outline" className="rounded-full md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LayoutNavBarV3
