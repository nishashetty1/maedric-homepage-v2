'use client';

import React, { useEffect } from "react";
import { Button, Typography } from "@/components/ui";

const Hero: React.FC = () => {
  // Preload video for better performance
  useEffect(() => {
    const videoPreload = document.createElement("link");
    videoPreload.href = "/video/HeroSection.mp4";
    videoPreload.as = "video";
    videoPreload.type = "video/mp4";
    document.head.appendChild(videoPreload);

    return () => {
      document.head.removeChild(videoPreload);
    };
  }, []);

  return (
    <section 
      className="relative w-full h-screen min-h-[600px] max-h-[1024px] overflow-hidden md:-mt-[160px]"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/video/HeroSection.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container - Desktop */}
      <div className="hidden md:flex inset-0 z-10 items-center justify-center">
        <div className="container absolute bottom-20 mx-auto px-8 lg:px-20 flex justify-around gap-6 lg:gap-70">
          <div className="flex flex-col pt-[160px]">
            {/* Main heading */}
            <Typography
              as="h1Light"
              className="text-[32px] md:text-[40px] lg:text-[48px] text-white mb-4"
              align="left"
            >
              Your Dream <br/> Jewellery, One <br/> Click Away
            </Typography>

            {/* Subheading */}
            <Typography
              as="body-light"
              className="text-[16px] md:text-[18px] lg:text-[20px] text-white mb-8 !font-light"
              align="left"
            >
              Designed by artisans, made for <br/> your moments
            </Typography>
          </div>

          <div className="flex items-end">
            {/* CTA Button */}
            <Button
              variant="default"
              className="w-auto max-w-[300px] h-[48px] backdrop-blur-[100px] border border-white"
            >
              EXPLORE OUR JEWELLERY
            </Button>
          </div>
        </div>
      </div>

      {/* Content Container - Mobile */}
      <div className="md:hidden absolute inset-0 z-10 flex flex-col justify-between p-4">
        {/* Main content for mobile */}
        <div className="flex flex-col items-center text-center px-6 pb-16 justify-between h-screen pt-16">
          {/* Main heading */}
          <div>
            <Typography
              as="h1Light"
              className="text-[28px] leading-tight text-white mb-3"
            >
              Your Dream Jewellery, One Click Away
            </Typography>

            <Typography
              as="body-light"
              className="text-[16px] text-white mb-6 !font-light"
            >
              Designed by artisans, made for your moments
            </Typography>
          </div>

          <Button
            variant="outlinedDark"
            className="w-full max-w-[280px] h-[48px] border border-white !text-white text-[14px] mt-auto mb-8"
          >
            EXPLORE OUR JEWELLERY
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;