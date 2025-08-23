"use client";

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Define label variants
type LabelVariant = 'light' | 'dark';

// Props for Label component
interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: LabelVariant;
  underline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  variant = 'light',
  underline = false,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  // Track hover state for animations
  const [isHovered, setIsHovered] = useState(false);

  // Base classes for the label
  const baseClasses = 'inline-flex items-center h-6 gap-4 transition-all cursor-pointer';
  
  // Variant specific classes
  const variantClasses: Record<LabelVariant, string> = {
    light: 'text-[var(--default)]',
    dark: 'text-[var(--primary)]'
  };
  
  // Underline classes
  const underlineClasses = underline ? 'underline underline-offset-2' : '';
  
  // Animation classes
  const animationClasses = isHovered ? 'translate-x-1' : 'translate-x-0';
  const animationDuration = 'transition-transform duration-800 ease-linear';
  
  // Arrow color based on variant
  const arrowColor = variant === 'light' ? 'var(--default)' : 'var(--primary)';
  
  return (
    <span
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        underlineClasses,
        animationDuration,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...rest}
    >
      {/* Label content */}
      <span className={`${animationClasses} ${animationDuration}`}>{children}</span>
      
      {/* Chevron right arrow icon */}
      <svg 
        width="6" 
        height="10" 
        viewBox="0 0 6 10" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${animationClasses} ${animationDuration}`}
      >
        <path 
          d="M1 1L5 5L1 9" 
          stroke={arrowColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export default Label;