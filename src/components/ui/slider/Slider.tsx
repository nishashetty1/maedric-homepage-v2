'use client'
import React, { useRef, useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface SliderProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  slidesPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  title,
  subtitle,
  activeIndex,
  onPrevious,
  onNext,
  slidesPerView = { mobile: 1, tablet: 2, desktop: 4 },
  className = "",
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate proper translation for the track
  const getTrackTranslation = () => {
    if (typeof window !== "undefined") {
      const viewportWidth = window.innerWidth;
      let slideSize = 100;
      
      if (viewportWidth >= 1024) {
        // Desktop - calculate percentage based on desktop slides per view
        slideSize = 100 / slidesPerView.desktop;
      } else if (viewportWidth >= 768) {
        // Tablet - calculate percentage based on tablet slides per view
        slideSize = 100 / slidesPerView.tablet;
      }
      
      return `translateX(-${activeIndex * slideSize}%)`;
    }
    return `translateX(-${activeIndex * 100}%)`;
  };

  // Track styles with improved translation calculation
  const trackStyles = {
    transform: getTrackTranslation(),
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    width: isMobile ? `${React.Children.count(children) * 90}%` : "100%"
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section title and subtitle */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2 font-medium text-[var(--primary)]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm md:text-base text-[var(--consultationForm)]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Slider container */}
      <div className="relative">
        {/* Navigation buttons - hidden on mobile */}
        {!isMobile && (
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-2 z-10">
            <button
              onClick={onPrevious}
              aria-label="Previous slide"
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200"
            >
              <SlArrowLeft className="text-[var(--primary)] text-xl" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next slide"
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors duration-200"
            >
              <SlArrowRight className="text-[var(--primary)] text-xl" />
            </button>
          </div>
        )}

        {/* Slider overflow container */}
        <div 
          className={`overflow-x-${isMobile ? 'auto' : 'hidden'} -mx-2 px-2`} 
          ref={sliderRef}
          style={{ scrollSnapType: isMobile ? 'x mandatory' : 'none' }}
        >
          {/* Slider track */}
          <div 
            className={`flex ${!isMobile && 'transition-transform duration-300 ease-in-out'}`}
            style={!isMobile ? trackStyles : undefined}
          >
            {/* Individual slide items */}
            {React.Children.map(children, (child, index) => (
              <div 
                className={`
                  flex-shrink-0 px-2
                  ${isMobile ? 'w-[85%] scroll-snap-align-start' : ''}
                  ${!isMobile && `
                    md:w-1/${slidesPerView.tablet} 
                    lg:w-1/${slidesPerView.desktop}
                  `}
                `}
                style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                key={index}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;