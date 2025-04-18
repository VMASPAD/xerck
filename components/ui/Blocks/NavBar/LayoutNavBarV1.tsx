import { Search, Terminal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import React from 'react'

function LayoutNavBarV1() {
  return (
    <div className="min-h-screen bg-muted">
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Terminal className="shrink-0" />
          <div className="relative hidden md:block">
            <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
            <Input
              className="pl-10 flex-1 bg-slate-100/70 dark:bg-slate-800 border-none shadow-none w-[280px] rounded-full"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
          >
            <Search className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full"
          >
            Sign In
          </Button>
          <Button className="rounded-full">Get Started</Button>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default LayoutNavBarV1
