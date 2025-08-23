import React from "react";
import { twMerge } from "tailwind-merge";
import { JSX } from "react";

// Allowed typography variants
type TypographyVariant =
  | "h1"
  | "h1Light"
  | "h2"
  | "h3"
  | "h4"
  | "subheading"
  | "header-text"
  | "body-large"
  | "body-light"
  | "body"
  | "cta"
  | "body-small";

// Allowed text alignments
type TextAlign = "center" | "left" | "right" | "justify";

// Specific color options (without the generic string)
type PredefinedColor = "primary" | "accent" | "light" | "white";
type TextColor = PredefinedColor | string;

// Props for Typography component
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyVariant;
  align?: TextAlign;
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
}

// Typography component
const Typography: React.FC<TypographyProps> = ({
  as = "h2",
  align = "center",
  color = "primary",
  children,
  className = "",
  ...rest
}) => {
  
  // Parse custom text size from className if present
  const hasCustomTextSize = className.includes("!text-[");

  // Responsive font styles for each variant
  const elementStyles: Record<TypographyVariant, string> = {
    // Header H1 - Quiche Medium 40px
    h1: "font-sans font-medium text-[32px] leading-[36px] sm:text-[36px] sm:leading-[40px] md:text-[40px] md:leading-[44px]",

    // Header H1 - Quiche Medium 40px
    h1Light: "font-sans font-light text-[32px] leading-[36px] sm:text-[36px] sm:leading-[40px] md:text-[40px] md:leading-[44px]",

    // Heading H2 - Quiche Regular 36px
    h2: "font-sans font-normal text-[26px] leading-[32px] sm:text-[32px] sm:leading-[36px] md:text-[36px] md:leading-[40px]",

    // Subheading H3 - Quiche Regular 24px
    h3: "font-sans font-normal text-[20px] leading-[24px] sm:text-[22px] sm:leading-[26px] md:text-[24px] md:leading-[28px]",

    // Heading H4 - Figtree Regular 20px
    h4: "font-[Figtree] font-normal text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px]",

    // Subheading Text - Figtree Medium 18px
    subheading:
      "font-[Figtree] font-body font-medium text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px] md:text-[18px] md:leading-[22px]",

    // Header Text - Figtree Medium 18px
    "header-text":
      "font-[Figtree] font-body font-medium text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px] md:text-[18px] md:leading-[22px]",

    // Body Text Large - Figtree Regular 20px
    "body-large":
      "font-[Figtree] font-body font-normal text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px]",

    // Body Text Light - Figtree Light 20px
    "body-light": hasCustomTextSize
      ? "font-body font-[Figtree] font-light"
      : "font-body font-[Figtree] font-light text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px]",

    // Body Text Normal - Figtree Regular 16px
    body: "font-body font-[Figtree] font-normal text-[14px] leading-[18px] sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]",

    // CTA Text - Figtree Semibold 16px
    cta: "font-[Figtree] font-semibold text-[14px] leading-[18px] sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]",

    // Body Text Small - Figtree Light 12px
    "body-small":
      "font-[Figtree] font-light text-[10px] leading-[14px] sm:text-[11px] sm:leading-[15px] md:text-[12px] md:leading-[16px]",
  };

  // Color variations
  const colorStyles: Record<PredefinedColor, string> = {
    primary: "text-[var(--primary)]",
    accent: "text-[var(--accent)]",
    light: "text-[var(--default)]",
    white: "text-white",
  };

  // Text alignment styles
  const alignmentStyles: Record<TextAlign, string> = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    justify: "text-justify",
  };

  // Get the alignment class
  const alignClass = alignmentStyles[align];

  // Get the typography style for the element
  const elementClass = elementStyles[as];

  // Get the color class if it's a predefined color
  const colorClass =
    color in colorStyles ? colorStyles[color as PredefinedColor] : "";

  // Add spacing that scales with heading size
  const spacingClass = "mb-3 sm:mb-4 md:mb-5";

  // Map typography variants to HTML tags
  const tagMap = {
    h1: "h1",
    h1Light: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    subheading: "h5",
    "header-text": "h6",
    "body-large": "p",
    "body-light": "p",
    body: "p",
    cta: "p",
    "body-small": "p",
  } as const;

  // Define the component type more specifically
  type TagType = keyof JSX.IntrinsicElements;
  const Component = tagMap[as] as TagType;

  // Custom color passed directly
  const customColorStyle =
    !(color in colorStyles) && color ? { color } : undefined;

  return React.createElement(
    Component,
    {
      className: twMerge(
        elementClass,
        colorClass,
        alignClass,
        spacingClass,
        className
      ),
      style: customColorStyle,
      ...rest,
    },
    children
  );
};

export default Typography;
