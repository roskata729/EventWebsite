"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-3xl border border-brand-accent/30 bg-brand-surface/85 p-8 shadow-premium backdrop-blur ${className}`}
    >
      {children}
    </motion.article>
  );
}
