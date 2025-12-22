import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

export interface SearchInputProps extends InputProps {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className={cn("pl-9", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
