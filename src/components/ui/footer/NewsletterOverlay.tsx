"use client";

import React from "react";
import { Typography, Button } from "@/components/ui";
import { SlArrowRight } from "react-icons/sl";
import { motion } from "framer-motion";
import { useFooterStore } from "@/store/footerStore";

interface NewsletterOverlayProps {
  className?: string;
}

const NewsletterOverlay: React.FC<NewsletterOverlayProps> = ({ className = "" }) => {
  const { email, setEmail, handleSubscribe } = useFooterStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-[var(--accent)] px-4 py-8 md:py-10 md:px-16 mx-4 md:mx-auto max-w-6xl shadow-lg ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="md:w-1/2">
          <Typography 
            as="h2"
            color="var(--primary)" 
            align="left" 
            className="!mb-2 text-[28px] md:text-[32px] font-normal"
          >
            Newsletter
          </Typography>
          <Typography
            as="body"
            color="var(--primary)"
            align="left"
            className="!mb-0 text-sm md:text-base"
          >
            Be the first to discover new collections, stories, and exclusive offers.
          </Typography>
        </div>

        <div className="md:w-1/2">
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@yahoomail.com"
              className="flex-grow border border-[var(--primary)] bg-transparent px-4 py-3 focus:outline-none text-[var(--primary)]"
              required
            />
            <Button 
              variant="outlined" 
              type="submit"
              className="md:ml-auto w-auto bg-[var(--primary)] !border-[var(--primary)] !py-3 !px-6 text-white"
            >
              <span className="flex items-center justify-center gap-2 w-full">
                SUBSCRIBE <SlArrowRight />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterOverlay;