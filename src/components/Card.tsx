
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-8 glass-card backdrop-blur-sm shadow-sm border border-white/10 hover-lift eth-transition",
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
