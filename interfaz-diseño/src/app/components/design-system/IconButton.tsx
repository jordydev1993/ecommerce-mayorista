import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white/80 backdrop-blur-xl hover:bg-white border border-white/30",
        ghost: "hover:bg-white/50",
        solid: "bg-white hover:bg-gray-100",
        lime: "bg-[var(--lime)] text-black hover:bg-[var(--lime)]/90",
        blue: "bg-[var(--blue)] text-white hover:bg-[var(--blue)]/90",
        orange: "bg-[var(--orange)] text-white hover:bg-[var(--orange)]/90"
      },
      size: {
        sm: "h-8 w-8 rounded-xl",
        md: "h-10 w-10 rounded-2xl",
        lg: "h-12 w-12 rounded-2xl",
        xl: "h-16 w-16 rounded-3xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  badge?: number | string;
  badgeColor?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, badge, badgeColor = "var(--lime)", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          iconButtonVariants({ variant, size }),
          "relative hover:scale-110 active:scale-95",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {badge && (
          <span
            className="absolute -top-1 -right-1 min-w-[1rem] h-4 px-1 rounded-full text-[10px] flex items-center justify-center font-medium"
            style={{ backgroundColor: badgeColor, color: badgeColor === "var(--lime)" ? "black" : "white" }}
          >
            {badge}
          </span>
        )}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
