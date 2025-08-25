"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

// Allowed button variants
type ButtonVariant =
  | "default"
  | "filled"
  | "outlined"
  | "outlinedDark"
  | "cta"
  | "tab"
  | "consultation";

// Button component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  active = false,
  fullWidth = false,
  children,
  className = "",
  ...rest
}) => {
  // Base styles shared by all button variants
  const baseClasses =
    "flex items-center justify-center text-center gap-[10px] whitespace-nowrap cursor-pointer relative overflow-hidden group";

  // Style variations based on variant prop
  const variantClasses: Record<ButtonVariant, string> = {
    // Default variant (transparent with border)
    default:
      "border border-[var(--default)] text-[var(--default)] py-4 px-[105px] transition-all duration-300 ease-out hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)] before:absolute before:content-[''] before:bg-[var(--primary)] before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out hover:text-[var(--default)]",

    // Filled variant (primary color background)
    filled:
      "border border-[var(--primary)] bg-[var(--primary)] text-[var(--default)] py-4 px-[105px] transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:translate-y-[-2px]",

    // Outlined variant (transparent with primary color border)
    outlined:
      "border border-[var(--primary)] bg-[var(--default)-05] text-[var(--primary)] py-4 px-[105px] transition-all duration-300 ease-out before:absolute before:content-[''] before:bg-[var(--primary)] before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:origin-top before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-300 before:ease-out hover:text-[var(--default)] hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]",

    // OutlinedDark variant (for dark backgrounds)
    outlinedDark:
      "border border-[var(--default)] bg-[var(--default)-05] text-[var(--default)] py-4 px-[105px] transition-all duration-300 ease-out before:absolute before:content-[''] before:bg-[var(--default-05)] before:top-0 before:right-0 before:w-full before:h-full before:z-[-1] before:origin-top before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",

    // CTA variant (with arrow)
    cta: "border border-[var(--secondary)] text-[var(--secondary)] py-4 px-[105px] transition-all duration-300 ease-out before:absolute before:content-[''] before:bg-[var(--secondary)] before:top-[100%] before:left-0 before:origin-top before:w-full before:h-full before:z-[-1] hover:before:top-0 before:transition-all before:duration-300 hover:text-[var(--primary)] hover:shadow-[0_0_12px_rgba(var(--secondary-rgb),0.5)]",

    // Tab button variant
    tab: active
      ? "w-full bg-[var(--primary)] text-[var(--default)] py-6 px-30 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"
      : "w-full border border-black bg-transparent text-black py-6 px-30 transition-all duration-300 ease-out hover:shadow-[0_0_8px_rgba(255,255,255,0.4)] before:absolute before:content-[''] before:bg-[var(--primary)] before:opacity-10 before:top-0 before:left-[-100%] before:w-[50%] before:h-full before:skew-x-[-20deg] hover:before:animate-shine",

    // Consultation form button variant
    consultation: active
    ? "border border-[var(--consultationForm)] border-2 text-white bg-[var(--consultationForm)] py-[10px] px-2 gap-[8px] font-medium relative z-0"
    : "border border-[var(--consultationFormBorder)] text-[var(--consultationForm)] py-[10px] px-2 gap-[8px] font-normal relative z-0 transition-colors duration-300 ease-in-out hover:text-white hover:border-[var(--consultationForm)] hover:border-2 before:absolute before:content-[''] before:bg-[var(--consultationForm)] before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:origin-top before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-300 before:ease-out",
};

  // Width classes based on props and responsive design
  const widthClasses = fullWidth
    ? "w-full"
    : variant === "default" || variant === "filled"
      ? "w-[382px]"
      : variant === "outlined" ||
          variant === "outlinedDark" ||
          variant === "cta"
        ? "w-[240px]"
        : variant === "tab"
          ? "w-[110px] lg:w-[600px]"
          : variant === "consultation"
            ? "min-w-[119px] w-auto"
            : "";

  // Height classes based on variant
  const heightClasses =
    variant === "tab"
      ? "h-[36px]"
      : variant === "consultation"
        ? "h-[30px]"
        : "h-[48px]";

  // Check if it's a CTA button that needs arrow
  const isCTA = variant === "cta";

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        widthClasses,
        heightClasses,
        className
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {isCTA && (
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform rotate-90 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke={variant === "cta" ? "var(--default)" : "var(--secondary)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default Button;
