"use client";

import React from "react";
import { Typography, Button } from "@/components/ui";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <section className="w-full py-12 border-t border-b border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Title */}
          <Typography as="h2" color="primary" className="!mb-1 md:!mb-2 text-2xl md:text-3xl">
            Looking For Something Truly One-Of-A-Kind?
          </Typography>
          
          {/* Subtitle */}
          <Typography 
            as="body-light" 
            className="!text-[var(--consultationForm)] !text-base !mb-6 md:!mb-8 max-w-xl"
          >
            Let us source rare gemstones or craft bespoke pieces tailored just for you.
          </Typography>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center">
            <Link href="/request-quote" className="w-full sm:w-auto">
              <Button 
                variant="outlined" 
                className="w-full !border-[var(--primary)] text-[var(--primary)]"
              >
                REQUEST A QUOTE!
              </Button>
            </Link>
            
            <Link href="/our-legacy" className="w-full">
              <Button 
                variant="default" 
                className="w-full !bg-[var(--accent)] !border-[var(--accent)] text-white hover:!text-[var(--primary)]"
              >
                DISCOVER OUR LEGACY!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;