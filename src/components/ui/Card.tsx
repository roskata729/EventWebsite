import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`rounded-3xl border border-brand-accent/30 bg-brand-surface/85 p-8 shadow-premium backdrop-blur ${className}`}
    >
      {children}
    </article>
  );
}
