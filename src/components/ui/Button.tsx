import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary: "border-brand-accent bg-brand-accent text-brand-background hover:brightness-110",
  secondary: "border-brand-accent/45 bg-brand-surface text-brand-foreground hover:bg-brand-elevated",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft disabled:cursor-not-allowed disabled:opacity-60 ${variantClassName[variant]} ${className}`}
      {...props}
    />
  );
}
