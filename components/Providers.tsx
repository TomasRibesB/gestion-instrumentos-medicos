"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes/dist/types"
import { AuthProvider } from "@/contexts/AuthContext"

export function Providers({ children, ...props }: any) {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextThemesProvider>
  )
}
