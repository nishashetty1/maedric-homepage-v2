"use client";

import React from "react";
import { Header, HeaderMobile } from "@/components/layout";
import { useHeaderEffects } from "@/store/headerStore";
import { useInitHeaderMobile } from "@/store/headerMobileStore";

//Container component that initializes header state and passes data to Header

const HeaderContainer: React.FC = () => {
  // Initialize header effects and mobile header
  useHeaderEffects();
  useInitHeaderMobile();

  // Navigation links configuration
  const LINKS = [
    { label: "About", href: "/about" },
    { label: "Jewellery", href: "/jewellery", hasDropdown: true },
    { label: "Gemstones", href: "/gemstones", hasDropdown: true },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  // Dropdown menus configuration
  const dropdowns = {
    "Gemstones": ["Featured", "Ruby", "Sapphire", "Emerald", "Diamond"],
    "Jewellery": ["Featured", "Rings", "Earring", "Necklaces", "Bracelets", "Brooches"],
  };

  return (
    <>
      <Header links={LINKS} dropdowns={dropdowns} />
      <HeaderMobile />
    </>
  );
};

export default HeaderContainer;