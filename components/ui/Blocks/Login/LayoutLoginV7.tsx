import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Mail, KeyRound, LogIn, ExternalLink } from "lucide-react";

function LayotLoginV7() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-primary-foreground">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold">Welcome back!</h1>
            <p className="mb-8 text-lg opacity-90">
              Sign in to continue your journey with our platform and access all your 
              personal data and settings.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg bg-primary-foreground/10 p-4 text-left backdrop-blur-sm">
                <div className="flex-shrink-0 rounded-full bg-primary-foreground/10 p-1.5">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Authentication</h3>
                  <p className="text-sm opacity-90">Your data is protected with enterprise-grade security.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-primary-foreground/10 p-4 text-left backdrop-blur-sm">
                <div className="flex-shrink-0 rounded-full bg-primary-foreground/10 p-1.5">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Cross-Platform Access</h3>
                  <p className="text-sm opacity-90">Access your account from any device, anywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center bg-background p-4 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex flex-col text-center">
            <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="mt-2 text-muted-foreground">
              Enter your credentials below to continue
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
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
                    <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </Button>
                  <div className="relative text-center text-xs text-muted-foreground">
                    <span className="relative z-10 bg-card px-2">
                      Or continue with
                    </span>
                    <div className="absolute left-0 top-1/2 h-px w-full bg-border"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Google
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Sign up
              <ExternalLink className="ml-1 inline h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayotLoginV7
