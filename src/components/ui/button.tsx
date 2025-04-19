
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-scholarship-accent text-white hover:bg-scholarship-accent/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-scholarship-accent/20 bg-white/50 text-scholarship-foreground hover:bg-scholarship-accent/10",
        secondary:
          "bg-white/50 border border-black/10 text-scholarship-foreground hover:bg-scholarship-accent/10",
        ghost: "bg-transparent hover:bg-scholarship-accent/10 text-scholarship-foreground",
        link: "text-scholarship-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Add click feedback
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      target.classList.add('button-feedback');
      
      // Optional click sound
      const clickSound = new Audio('/button-click.mp3');
      clickSound.volume = 0.2;
      clickSound.play().catch(e => console.log('Audio playback prevented:', e));
      
      // Remove animation class after animation completes
      setTimeout(() => {
        target.classList.remove('button-feedback');
      }, 200);
      
      if (onClick) onClick(e);
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
