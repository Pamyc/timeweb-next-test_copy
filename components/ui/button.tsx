import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md";
}

export function Button({ className, variant = "default", size = "md", ...props }: Props) {
  const base = "rounded-xl px-4 py-2 border transition";
  const variants = {
    default: "bg-primary text-primary-foreground border-transparent hover:opacity-90",
    outline: "bg-transparent border-border hover:bg-accent",
    ghost: "bg-transparent border-transparent hover:bg-accent",
    secondary: "bg-secondary text-foreground border-transparent hover:bg-accent"
  };
  const sizes = { sm: "text-xs h-8", md: "text-sm h-10" };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}
