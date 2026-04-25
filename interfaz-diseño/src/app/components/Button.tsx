import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  icon?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  icon = false,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 backdrop-blur-xl";

  const variants = {
    primary: "bg-[var(--lime)] text-black hover:scale-105 hover:shadow-lg hover:shadow-[var(--lime)]/30",
    secondary: "bg-white/80 text-black hover:bg-white border border-white/50 hover:scale-105",
    glass: "bg-white/60 backdrop-blur-xl border border-white/30 text-black hover:bg-white/80 hover:scale-105"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}
