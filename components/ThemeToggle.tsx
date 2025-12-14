"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <button
      className={cn(
        "relative rounded-full p-2 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute left-2 top-2 h-5 w-5 scale-0 transition-all dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
