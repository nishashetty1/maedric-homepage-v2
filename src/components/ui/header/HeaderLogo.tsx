"use client";

import React from "react";
import Link from "next/link";

interface HeaderLogoProps {
  isCompact?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ isCompact = false }) => {
  return (
    <Link href="/" className="text-center">
      <h1 
        className={`font-[Cinzel] font-extralight tracking-wider text-[var(--primary)]
        ${isCompact ? "text-xl" : "text-5xl"}`}
      >
        MAEDRIC
      </h1>
      <p 
        className={`font-[Cinzel] uppercase tracking-widest text-[var(--primary)]
        ${isCompact ? "text-[7px]" : "text-[18px]"}`}
      >
        Gemstones & Jewellery
      </p>
    </Link>
  );
};

export default HeaderLogo;