"use client";

import React from "react";
import {
  AiFillInstagram
} from "react-icons/ai";
import {
  TbBrandTiktokFilled
} from "react-icons/tb";
import {
  PiYoutubeLogoFill, PiFacebookLogoFill, PiTelegramLogoFill
} from "react-icons/pi";
import { motion } from "framer-motion";

interface FooterSocialLinksProps {
  variant?: "desktop" | "mobile";
}

const FooterSocialLinks: React.FC<FooterSocialLinksProps> = ({
  variant = "desktop"
}) => {
  const isMobile = variant === "mobile";

  return (
    <div className={`flex ${isMobile ? 'justify-center space-x-6 mb-6' : 'space-x-4'}`}>

      {/* Facebook */}
      <motion.a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--secondary)] `}
        whileHover={isMobile ? { scale: 1.1 } : undefined}
        whileTap={{ scale: 0.9 }}
      >
        <div className="h-6 w-6 relative flex items-center justify-center">

          <PiFacebookLogoFill size={24} />

        </div>
      </motion.a>

      {/* Instagram */}
      <motion.a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--secondary)]`}
        whileHover={isMobile ? { scale: 1.1 } : undefined}
        whileTap={{ scale: 0.9 }}
      >
        <div className="h-6 w-6 relative flex items-center justify-center">

          <AiFillInstagram size={24} />

        </div>
      </motion.a>

      {/* TikTok */}
      <motion.a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--secondary)]`}
        whileHover={isMobile ? { scale: 1.1 } : undefined}
        whileTap={{ scale: 0.9 }}
      >
        <div className="h-6 w-6 relative flex items-center justify-center">
          <TbBrandTiktokFilled size={24} />
        </div>
      </motion.a>

      {/* YouTube */}
      <motion.a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--secondary)]`}
        whileHover={isMobile ? { scale: 1.1 } : undefined}
        whileTap={{ scale: 0.9 }}
      >
        <div className="h-6 w-6 relative flex items-center justify-center">
          <PiYoutubeLogoFill size={24} />
        </div>
      </motion.a>

      {/* Telegram */}
      <motion.a
        href="https://telegram.org"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[var(--secondary)]`}
        whileHover={isMobile ? { scale: 1.1 } : undefined}
        whileTap={{ scale: 0.9 }}
      >
        <div className="h-6 w-6 relative flex items-center justify-center">
          <PiTelegramLogoFill size={24} />
        </div>
      </motion.a>
    </div>
  );
};

export default FooterSocialLinks;