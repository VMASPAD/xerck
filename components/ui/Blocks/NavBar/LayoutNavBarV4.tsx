import { ChevronDown, LogIn, Menu, Package, Search, Settings, Terminal, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV4() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-sidebar hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <Terminal className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg text-sidebar-foreground">XerckUI</span>
          </div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
              <Package className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Users className="h-5 w-5" />
              <span>Team</span>
            </a>
            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      <nav className="fixed top-0 inset-x-0 h-16 bg-background border-b border-border z-10">
        <div className="h-full flex items-center justify-between mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Terminal className="h-6 w-6" />
            <span className="font-bold">XerckUI</span>
          </div>
          
          <div className="flex-1 flex justify-center px-4 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="w-full rounded-full bg-secondary py-2 pl-10 pr-4 text-sm outline-none border border-border"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="rounded-full">
              <LogIn className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LayoutNavBarV4
