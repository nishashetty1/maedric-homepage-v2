"use client";

import React from "react";
import Link from "next/link";
import { useFooterStore } from "@/store/footerStore";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbWallet } from "react-icons/tb";
import { SlArrowDown } from "react-icons/sl";
import { Typography } from "@/components/ui";
import {
  FooterSocialLinks,
  FooterLinkGroup,
  FooterPaymentMethods,
} from "@/components/ui";
import NewsletterOverlay from "@/components/ui/footer/NewsletterOverlay";

const Footer: React.FC = () => {
  const { footerLinks, paymentMethods, currentYear } = useFooterStore();

  return (
    <div className="relative mt-52 md:mt-24">
      {/* Newsletter positioned with margins instead of absolute positioning */}
      <div className="absolute left-0 right-0 -top-20 md:top-0 translate-y-[-50%] z-30 mx-4 md:mx-12">
        <NewsletterOverlay />
      </div>

      {/* Footer with adjusted padding */}
      <footer className="bg-[var(--primary)] text-[var(--secondary)]">
        {/* Desktop Footer */}
        <div className="mx-2 md:px-12 pb-4 pt-28 md:pt-36">
          <div className="container mx-auto px-4">
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row gap-8 md:mb-12 max-w-6xl mx-auto">
              {/* Logo and About Section */}
              <div className="max-w-sm">
                <Link href="/" className="text-left">
                  <h1 className="font-[Cinzel] font-300 text-4xl text-[var(--default)] tracking-wider">
                    MAEDRIC
                  </h1>
                  <p className="font-[Cinzel] text-[12px] font-300 uppercase text-[var(--default)] tracking-widest">
                    Gemstones & Jewellery
                  </p>
                </Link>
                <Typography
                  as="body-light"
                  align="justify"
                  color="var(--default-footer)"
                  className="mt-6 !text-[16px] font-light"
                >
                  At Maedric, we aim to make the beauty of coloured gemstones
                  more accessible, inviting new collectors and jewellery lovers
                  to appreciate true quality and craftsmanship.
                </Typography>
              </div>

              {/* Navigation Links - Explore */}
              <FooterLinkGroup title="Explore" links={footerLinks.Explore} />

              {/* Contact Links */}
              <FooterLinkGroup title="Contact" links={footerLinks.Contact} />
            </div>

            <div className="hidden md:block">
              {/* Payment Methods */}
              <FooterPaymentMethods payments={paymentMethods} />
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--secondary)] opacity-20 mb-4 hidden md:block"></div>

            {/* Copyright and Social Media */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
              {/* Language and Currency Selectors - Desktop Only */}
              <div className="hidden md:flex space-x-4">
                {/* Language Selector */}
                <div className="border border-[var(--default-border)] px-4 py-2 flex items-center justify-between w-20">
                  <div className="flex items-center">
                    <AiOutlineGlobal size={20} />
                  </div>
                  <SlArrowDown size={12} />
                </div>

                {/* Currency Selector */}
                <div className="border border-[var(--default-border)] px-4 py-2 flex items-center justify-between w-20">
                  <div className="flex items-center">
                    <TbWallet size={20} />
                  </div>
                  <SlArrowDown size={12} />
                </div>
              </div>

              {/* Copyright */}
              <div className="hidden md:block text-center w-full md:w-auto">
                <Typography
                  as="body-light"
                  align="center"
                  color="var(--default)"
                  className="md:mt-6 !text-[16px]"
                >
                  © {currentYear} Maedric. All rights reserved. Crafted with
                  care, inspired by legacy.
                </Typography>
              </div>

              {/* Social Media Links */}
              <div className="hidden md:block">
                <FooterSocialLinks variant="desktop" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden pt-10 pb-6">
          <div className="px-6">
            {/* Divider */}
            <div className="h-px bg-[var(--secondary)] opacity-20 mb-6"></div>

            {/* Social Media Links - Mobile */}
            <FooterSocialLinks variant="mobile" />

            {/* Payment Methods - Mobile */}
            <FooterPaymentMethods payments={paymentMethods} variant="mobile" />

            {/* Copyright - Mobile */}
            <div className="text-center text-xs opacity-60">
              © {currentYear} Maedric. All rights reserved. Crafted with care,
              inspired by legacy.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;