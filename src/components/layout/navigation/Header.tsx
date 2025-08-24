"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHeaderStore } from "@/store/headerStore";
import { IoCallOutline } from "react-icons/io5";
import { HeaderIcons, HeaderLogo, Typography } from "@/components/ui";
import MegaMenu from "./MegaMenu";

// Navigation link structure
interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

// Props for Header component
interface HeaderProps {
  links: NavLink[];
  dropdowns: Record<string, string[]>;
}

const Header: React.FC<HeaderProps> = ({ links, dropdowns }) => {
  const { isScrolled, isLargeScreen, setHeaderHeight } = useHeaderStore();
  // Track which mega menu is currently visible
  const [activeMegaMenu, setActiveMegaMenu] = useState<
    "jewellery" | "gemstones" | null
  >(null);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(headerRef.current);
    window.addEventListener("scroll", updateHeight);

    return () => {
      if (headerRef.current) {
        resizeObserver.unobserve(headerRef.current);
      }
      window.removeEventListener("scroll", updateHeight);
    };
  }, [setHeaderHeight]);

  // Only apply the scrolled effect if we're on a large screen
  const shouldApplyScrollEffect = isLargeScreen && isScrolled;

  // Handle hover on nav items
  const handleNavHover = (label: string) => {
    if (label === "Jewellery") {
      setActiveMegaMenu("jewellery");
    } else if (label === "Gemstones") {
      setActiveMegaMenu("gemstones");
    } else {
      setActiveMegaMenu(null);
    }
  };

  // Handle mouse leave for the entire header
  const handleHeaderMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <>
      {/* WRAPPER - Hidden on small devices (< 768px) */}
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out
          ${shouldApplyScrollEffect ? "shadow-lg scrolled-header" : ""}
          hidden md:block
        `}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {/* TOP BAR - Only shown when not scrolled or on smaller screens */}
        <div
          className={`
            w-full text-[var(--primary)] bg-[var(--background)]/70 bg-blur-lg
            border-b-[0.2px] border-[var(--default)]
            transition-all duration-500 ease-in-out
            ${shouldApplyScrollEffect
              ? "h-0 opacity-0 overflow-hidden"
              : "h-auto"
            }
          `}
        >
          <div className="container mx-auto p-4 flex items-center justify-between max-w-6xl">
            {/* Left section - empty for spacing */}
            <div className="w-1/3 justify-start flex gap-1">
              <IoCallOutline size={13} className="mt-0.5" />
              <Typography
                as="body-light"
                className="text-[var(--primary)] font-light uppercase !text-[12px]"
              >
                Call or WhatsApp 65 8343 3698
              </Typography>
            </div>

            {/* Center logo section */}
            <div className="flex justify-center w-1/3">
              <HeaderLogo />
            </div>

            {/* Right section - icons */}
            <div className="flex justify-end w-1/3">
              <HeaderIcons />
            </div>
          </div>
        </div>

        {/* NAV LINKS ROW (sticky) */}
        <div
          className={`
            bg-[var(--background)]/70 bg-blur-lg transition-all duration-500 ease-in-out
            ${shouldApplyScrollEffect ? "py-3" : "py-1"}
          `}
        >
          <div
            className={`container mx-auto px-4 flex transition-all duration-500 ease-in-out max-w-6xl 
              ${shouldApplyScrollEffect
                ? "justify-between items-center"
                : "justify-center"
              }`}
          >
            {/* Logo - Only visible when scrolled on large screens */}
            {shouldApplyScrollEffect && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <HeaderLogo isCompact={true} />
              </motion.div>
            )}

            {/* Navigation Links */}
            <nav
              className={`font-[Figtree] text-sm font-light text-[var(--primary)] opacity-100 ${shouldApplyScrollEffect ? "flex-grow-0" : ""
                }`}
            >
              <div className="flex items-center space-x-15">
                {links.map((link) => (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => handleNavHover(link.label)}
                  >
                    <Link
                      href={link.href}
                      onMouseEnter={() => handleNavHover(link.label)}
                      className="font-[Figtree] text-[16px] hover:text-[var(--accent)] transition-all duration-300 py-2 block uppercase cursor-pointer"
                    >
                      {link.label}
                    </Link>

                    {/* Use MegaMenu for special categories */}
                    {link.label === "Jewellery" && (
                      <MegaMenu
                        type="jewellery"
                        isVisible={activeMegaMenu === "jewellery"}
                      />
                    )}

                    {link.label === "Gemstones" && (
                      <MegaMenu
                        type="gemstones"
                        isVisible={activeMegaMenu === "gemstones"}
                      />
                    )}

                    {/* Legacy dropdown for other menu items if needed */}
                    {link.hasDropdown &&
                      link.label !== "Jewellery" &&
                      link.label !== "Gemstones" &&
                      dropdowns[link.label] && (
                        <div
                          className="
                          absolute left-0 top-full pt-2
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-300 ease-in-out z-50
                        "
                        >
                          <div className="bg-[var(--background)]/70 bg-blur-lg text-[var(--primary)] shadow-md py-2 px-4 w-48">
                            {dropdowns[link.label].map((item) => (
                              <Link
                                key={item}
                                href={`/${link.label.toLowerCase()}/${item.toLowerCase()}`}
                                className="block py-2 transition-all duration-300 hover:bg-[var(--accent)]"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Icons - Only visible when scrolled on large screens */}
            {shouldApplyScrollEffect && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <HeaderIcons />
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div
        className={`w-full transition-all duration-500 ease-in-out hidden md:block 
          ${shouldApplyScrollEffect ? "h-24" : "h-[160px]"}`}
      ></div>
    </>
  );
};
export default Header;

