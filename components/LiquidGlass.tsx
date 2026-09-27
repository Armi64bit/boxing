'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  label?: string;
};

export function LiquidGlass({ children, className = '', eyebrow, label }: Props) {
  return (
    <div className={`liquid-glass ${className}`}>
      <div className="liquid-glass__highlight" aria-hidden="true" />
      <div className="liquid-glass__noise" aria-hidden="true" />
      <div className="liquid-glass__content">
        {(eyebrow || label) && (
          <div className="liquid-glass__meta">
            {eyebrow && <span>{eyebrow}</span>}
            {label && <span>{label}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
