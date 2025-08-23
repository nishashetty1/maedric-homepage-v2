"use client";
import React, { useEffect, useRef } from "react";
import { Card, Typography } from "@/components/ui";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSliderStore } from "@/store/sliderStore";

// Sample category data
const categories = [
  {
    id: 1,
    imageUrl: "/images/category/category1.png",
    title: "Ring",
    href: "/categories/ring",
    imageAlt: "Ring"
  },
  {
    id: 2,
    imageUrl: "/images/category/category2.png",
    title: "Earrings",
    href: "/categories/earrings",
    imageAlt: "Earrings"
  },
  {
    id: 3,
    imageUrl: "/images/category/category3.png",
    title: "Necklace",
    href: "/categories/necklace",
    imageAlt: "Necklace"
  },
  {
    id: 4,
    imageUrl: "/images/category/category4.png",
    title: "Bracelet",
    href: "/categories/bracelet",
    imageAlt: "Bracelet"
  },
];

const SLIDER_ID = "categories-slider";

const CategorySlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { 
    sliders, 
    isMounted, 
    showNavigation,
    setActiveIndex,
    setIsMounted,
    setShowNavigation,
    handleScroll,
  } = useSliderStore();
  
  const currentIndex = sliders[SLIDER_ID] || 0;
  const isSliderMounted = isMounted[SLIDER_ID] || false;
  const shouldShowNavigation = showNavigation[SLIDER_ID] || false;
  
  // Handle client-side initialization safely to avoid hydration issues
  useEffect(() => {
    // Initialize the slider index if it doesn't exist
    if (sliders[SLIDER_ID] === undefined) {
      setActiveIndex(SLIDER_ID, 0);
    }
    
    // Mark this slider as mounted
    setIsMounted(SLIDER_ID, true);
    
    const handleResize = () => {
      setShowNavigation(SLIDER_ID, window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setActiveIndex, setIsMounted, setShowNavigation, sliders]);
  
  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3.15;
      if (window.innerWidth >= 768) return 2.15;
      return 1.15;
    }
    return 1.15; // Default for SSR
  };

  return (
    <section className="py-6 px-4 md:px-10 max-w-6xl mx-auto">
      {/* Section heading */}
      <div className="text-center mb-8">
        <Typography as="h2" color="primary" className="text-2xl md:text-3xl">
          Shop By Jewellery Type
        </Typography>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Navigation buttons - only on desktop */}
        {isSliderMounted && shouldShowNavigation && (
          <>
            <button
              onClick={() => handleScroll('prev', SLIDER_ID, sliderRef, categories.length, getVisibleSlides())}
              aria-label="Previous slide"
              className="absolute top-1/2 -left-5 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
              <SlArrowLeft className="text-[var(--primary)] text-2xl" />
            </button>
            <button
              onClick={() => handleScroll('next', SLIDER_ID, sliderRef, categories.length, getVisibleSlides())}
              aria-label="Next slide"
              className="absolute top-1/2 -right-11 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
              <SlArrowRight className="text-[var(--primary)] text-2xl" />
            </button>
          </>
        )}

        {/* Slider scroll container */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto hide-scrollbar gap-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {categories.map((category) => (
            <div 
              key={category.id}
              className="flex-none snap-start"
              style={{ 
                width: isSliderMounted ? (
                  window.innerWidth >= 1024 ? 'calc((100% - 6rem) / 3.15)' :
                  window.innerWidth >= 768 ? 'calc((100% - 4rem) / 2.15)' :
                  'calc((100% - 2rem) / 1.15)'
                ) : '85%'
              }}
            >
              <div>
                <Card
                  variant="category"
                  imageUrl={category.imageUrl}
                  title={category.title}
                  href={category.href}
                  imageAlt={category.imageAlt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;