import * as React from "react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  hasBorder?: boolean;
}

export function ColorSwatch({
  color,
  name,
  selected = false,
  onClick,
  size = "md",
  hasBorder = false
}: ColorSwatchProps) {
  const sizes = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-14 h-14 rounded-2xl",
    lg: "w-20 h-20 rounded-3xl"
  };

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 transition-all"
    >
      <div
        className={cn(
          sizes[size],
          "transition-all group-hover:scale-110 group-active:scale-95",
          hasBorder && "border-2 border-gray-300",
          selected && "ring-4 ring-[var(--lime)] ring-offset-2"
        )}
        style={{ backgroundColor: color }}
      />
      <span className={cn(
        "text-gray-600 transition-colors group-hover:text-black",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-base"
      )}>
        {name}
      </span>
    </button>
  );
}
