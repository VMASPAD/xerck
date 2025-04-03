import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Fingerprint, Mail, Lock, Check, Github, Instagram } from "lucide-react";

function LayotLoginV5() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('/images/background-pattern.svg')] bg-cover bg-center bg-no-repeat p-4">
      <Card className="mx-auto w-full max-w-md border-none bg-background/80 backdrop-blur-md">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Fingerprint className="h-10 w-10" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">Secure Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-sm font-medium">Remember me</Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">New user?</span>
            <a href="#" className="text-xs text-primary hover:underline">Create an account</a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-6 pt-0">
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background/80 px-2 text-xs text-muted-foreground backdrop-blur-md">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
              <Github className="h-4 w-4" />
              <span className="text-sm">Github</span>
            </Button>
            <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
              <Instagram className="h-4 w-4" />
              <span className="text-sm">Instagram</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LayotLoginV5
