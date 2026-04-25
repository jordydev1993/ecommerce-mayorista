import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "backdrop-blur-xl border transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white/70 border-white/30 shadow-lg",
        strong: "bg-white/80 border-white/40 shadow-xl",
        light: "bg-white/50 border-white/20 shadow-md",
        colored: "border-white/30 shadow-xl"
      },
      glow: {
        none: "",
        lime: "hover:shadow-[var(--lime)]/20 hover:shadow-2xl",
        blue: "hover:shadow-[var(--blue)]/20 hover:shadow-2xl",
        orange: "hover:shadow-[var(--orange)]/20 hover:shadow-2xl"
      },
      rounded: {
        md: "rounded-2xl",
        lg: "rounded-3xl",
        xl: "rounded-[32px]",
        "2xl": "rounded-[40px]"
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10"
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      glow: "none",
      rounded: "lg",
      padding: "md",
      interactive: false
    }
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  blur?: boolean;
  blurColor?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({
    className,
    variant,
    glow,
    rounded,
    padding,
    interactive,
    blur = false,
    blurColor,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          glassCardVariants({ variant, glow, rounded, padding, interactive }),
          className
        )}
        {...props}
      >
        {blur && (
          <div
            className={cn(
              "absolute inset-0 opacity-30 blur-3xl rounded-full",
              blurColor || "bg-gradient-to-br from-[var(--lime)]/20 to-[var(--blue)]/20"
            )}
          />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };
