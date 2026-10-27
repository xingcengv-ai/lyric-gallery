import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}
export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps): React.ReactElement {
  const variants = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "bg-white/10 text-white hover:bg-white/15",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
