import { ChevronDown, Menu, Search, ShoppingCart, Terminal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV6() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-sidebar text-sidebar-foreground py-2 text-sm text-center font-medium">
        <span>🎉 New components released! Check out our latest update</span>
      </div>
      
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          {/* Top navigation bar */}
          <div className="h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Terminal className="h-6 w-6" />
              <span className="font-bold text-lg hidden md:inline-block">XerckUI</span>
            </div>
            
            <div className="hidden lg:block flex-1 max-w-md mx-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 rounded-lg border-input" 
                  placeholder="Search for components..." 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="outline" size="sm" className="rounded-lg hidden md:inline-flex">
                Sign In
              </Button>
              
              <Button size="sm" className="rounded-lg hidden md:inline-flex">
                Get Started
              </Button>
              
              <Button variant="ghost" size="sm" className="rounded-full md:hidden">
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="sm" className="rounded-full md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Bottom menu bar - categories */}
          <div className="h-12 border-t border-border hidden md:flex items-center px-6 overflow-x-auto">
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="flex items-center gap-1.5 text-primary font-medium">
                Components
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-primary">
                Templates
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center gap-1.5 hover:text-primary">
                Blocks
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-primary">Documentation</a>
              <a href="#" className="hover:text-primary">Pricing</a>
              <a href="#" className="hover:text-primary">Changelog</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LayoutNavBarV6
