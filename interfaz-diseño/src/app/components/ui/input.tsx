import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white/60 backdrop-blur-xl border border-white/30 focus-visible:ring-[var(--lime)]/50 focus-visible:border-[var(--lime)]/50",
        solid: "bg-white border border-gray-300 focus-visible:ring-[var(--blue)]/50 focus-visible:border-[var(--blue)]",
        glass: "bg-white/40 backdrop-blur-xl border border-white/20 focus-visible:ring-white/50 focus-visible:bg-white/60",
        outline: "bg-transparent border border-gray-300 focus-visible:ring-[var(--blue)]/50"
      },
      inputSize: {
        sm: "h-9 px-3 text-sm rounded-xl",
        md: "h-11 px-4 rounded-2xl",
        lg: "h-14 px-6 text-lg rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
