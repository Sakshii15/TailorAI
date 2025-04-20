"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numColumns?: number
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, numColumns = 1, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-4",
          numColumns === 1 && "grid-cols-1",
          numColumns === 2 && "grid-cols-2",
          numColumns === 3 && "grid-cols-3",
          numColumns === 4 && "grid-cols-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Grid.displayName = "Grid"

export { Grid }

