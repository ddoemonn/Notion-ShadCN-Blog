"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Menu, PenTool, Github, Twitter, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  userGithub?: string
  userTwitter?: string
  userLinkedin?: string
}

export function Navigation({ userGithub, userTwitter, userLinkedin }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-semibold">
          <PenTool className="h-6 w-6" />
          <span className="text-xl">Blog</span>
        </Link>

        {/* Right Side - Social Links + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Social Links */}
          {userGithub && (
            <Link 
              href={userGithub} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <Github className="h-4 w-4" />
            </Link>
          )}
          {userTwitter && (
            <Link 
              href={userTwitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <Twitter className="h-4 w-4" />
            </Link>
          )}
          {userLinkedin && (
            <Link 
              href={userLinkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          )}
          
          <ThemeToggle />
          
          {/* Mobile Menu (if needed for other nav items) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Add any additional mobile nav items here if needed */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
} 