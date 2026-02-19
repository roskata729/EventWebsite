import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return <Reveal className={className}>{children}</Reveal>;
}
