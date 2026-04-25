import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        lime: "bg-[var(--lime)]/20 text-black backdrop-blur-xl",
        orange: "bg-[var(--orange)] text-white",
        blue: "bg-[var(--blue)] text-white",
        glass: "bg-white/60 backdrop-blur-xl border border-white/30 text-black",
        outline: "border border-gray-300 bg-transparent",
        destructive: "bg-[var(--destructive)] text-white"
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-lg",
        md: "px-3 py-1 text-sm rounded-xl",
        lg: "px-4 py-2 rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
