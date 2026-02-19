import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-brand-background transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft ${className}`}
      {...props}
    />
  );
}
