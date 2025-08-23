"use client";

import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Typography from "./Typography";
import { SlArrowRight } from "react-icons/sl";

// Props for ViewAllButton
interface ViewAllButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  href = "/collections",
  text = "View All",
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "group inline-flex items-center gap-2 text-[var(--primary)]",
        className
      )}
    >
      <Typography
        as="subheading"
        align="left"
        color="primary"
        className="text-[var(--primary)] font-medium !mb-0 relative"
      >
        <span className="relative inline-block">
          {text}
          <span className="absolute -bottom-1 mt-2 left-0 w-0 h-[2px] bg-current group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </span>
      </Typography>
      <SlArrowRight width={10} height={8} className="transition-transform duration-300 group-hover:translate-x-1"/>
    </Link>
  );
};

export default ViewAllButton;