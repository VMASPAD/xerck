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
import { Apple, ArrowRight,  Facebook, Check } from "lucide-react";

function LayotLoginV4() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-4">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full group">
              Sign in
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
          
          <div className="relative text-xs text-center">
            <span className="bg-card px-2 text-muted-foreground relative z-10">
              Or continue with
            </span>
            <div className="absolute left-0 top-1/2 w-full border-t border-border" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline"  type="button" > 
            </Button>
            <Button variant="outline"  type="button" >
              <Apple className="h-4 w-4" />
            </Button>
            <Button variant="outline"  type="button" >
              <Facebook className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary underline-offset-4 hover:underline">
              Create account
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LayotLoginV4
