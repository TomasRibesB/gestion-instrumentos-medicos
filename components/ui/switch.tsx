"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label className={cn("inline-flex items-center cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}>
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div className={cn(
          "relative w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-background after:border-gray-300 dark:after:border-gray-800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
        , className)}></div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
