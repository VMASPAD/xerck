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
import { ArrowRight, User, LockKeyhole, Shield } from "lucide-react";

function LayotLoginV6() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10"></div>
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-secondary/10"></div>
        <div className="absolute bottom-32 left-32 h-40 w-40 rounded-full bg-accent/10"></div>
      </div>
      
      <Card className="mx-auto w-full max-w-sm border shadow-lg">
        <CardHeader>
          <div className="flex justify-center py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Account Login</CardTitle>
          <CardDescription className="text-center">Enter your information to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative rounded-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative rounded-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                className="group relative w-full overflow-hidden" 
                variant="success"
                type="submit"
              >
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Log In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-primary hover:underline">Sign up</a>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="hover:underline">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LayotLoginV6
