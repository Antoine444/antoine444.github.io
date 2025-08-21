import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium " +
    "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none " +
    "[&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer rounded-full hover:scale-105 font-semibold backdrop-blur-md" +
    "hover:shadow-glow text-muted-foreground-lighter",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
                outline:
                    "border border-border bg-gradient-gray backdrop-blur-md hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
                ghost: "hover:bg-accent hover:text-accent-foreground rounded-full",
                link: "text-primary underline-offset-4 hover:underline rounded-full",
                hero: "bg-gradient-primary transition-all duration-300 transform",
                accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-primary rounded-full",
                success: "bg-success text-success-foreground hover:bg-success/90 rounded-full",
            },
            size: {
                default: "h-10 px-4 py-2 rounded-full",
                sm: "h-9 px-3 rounded-full",
                lg: "h-11 px-8 rounded-full",
                icon: "h-10 w-10 rounded-full",
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
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button, buttonVariants }
