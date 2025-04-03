import { Bell, Menu, Moon, Search, Sun, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV7() {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-0 inset-x-0 h-16 bg-background border-b border-border z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-semibold">XerckUI</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="rounded-md text-sm">Dashboard</Button>
            <Button variant="ghost" className="rounded-md text-sm">Projects</Button>
            <Button variant="ghost" className="rounded-md text-sm">Team</Button>
            <Button variant="ghost" className="rounded-md text-sm">Reports</Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              JD
            </div>
          </div>
        </div>
      </nav>
      
      <div className="fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-sidebar hidden lg:block">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-full rounded-md bg-secondary py-2 pl-10 pr-4 text-sm outline-none"
            />
          </div>
          
          <div className="mt-6 space-y-1">
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-3">MAIN MENU</div>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <span>Projects</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <span>Team</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <span>Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutNavBarV7
