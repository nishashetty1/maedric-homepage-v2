"use client";

import React from "react";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { Typography } from "@/components/ui";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col md:mx-auto">
      <div className="relative mb-4">
        <Typography
          as="h3"
          align="justify"
          color="var(--accent)"
          className="font-light"
        >
          {title}
        </Typography>
        <div className="absolute -bottom-2 left-0 w-16 h-px bg-[var(--default)] opacity-60"></div>
      </div>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-md font-figtree font-light text-[var(--default)] opacity-50 hover:opacity-100 flex items-center group"
            >
              <SlArrowRight width={4} height={4} className="mr-2 transform transition-transform group-hover:translate-x-1" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;