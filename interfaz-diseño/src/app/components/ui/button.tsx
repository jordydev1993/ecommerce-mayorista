import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--lime)] text-black hover:scale-105 hover:shadow-lg hover:shadow-[var(--lime)]/30 active:scale-95",
        secondary:
          "bg-white/80 text-black hover:bg-white border border-white/50 hover:scale-105 active:scale-95",
        glass:
          "bg-white/60 backdrop-blur-xl border border-white/30 text-black hover:bg-white/80 hover:scale-105 active:scale-95",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-100 active:scale-95",
        ghost:
          "hover:bg-white/50 active:scale-95",
        destructive:
          "bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90 active:scale-95",
        link:
          "text-[var(--blue)] underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-9 rounded-xl px-4 text-sm",
        md: "h-11 rounded-2xl px-6",
        lg: "h-14 rounded-2xl px-8 text-lg",
        xl: "h-16 rounded-3xl px-10 text-xl",
        icon: "h-10 w-10 rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
