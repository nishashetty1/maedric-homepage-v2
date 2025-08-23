"use client";
import React, { useEffect, useRef } from "react";
import { Card, Typography } from "@/components/ui";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSliderStore } from "@/store/sliderStore";

// Sample collection data
const collections = [
  {
    id: 1,
    imageUrl: "/images/our-collections/collection1.png",
    title: "Collection 1",
    href: "/collections/collection1",
    imageAlt: "Jewelry collection 1",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 2,
    imageUrl: "/images/our-collections/collection2.png",
    title: "Collection 2",
    href: "/collections/collection2",
    imageAlt: "Jewelry collection 2",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 3,
    imageUrl: "/images/our-collections/collection3.png",
    title: "Collection 3",
    href: "/collections/collection3",
    imageAlt: "Jewelry collection 3",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 4,
    imageUrl: "/images/our-collections/collection4.png",
    title: "Collection 4",
    href: "/collections/collection4",
    imageAlt: "Jewelry collection 4",
    imageAspect: "3/4" as "3/4",
  },
];

const SLIDER_ID = "collections-slider";

const CollectionSlider: React.FC = () => {
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
        <Typography as="h2" color="primary" className="text-2xl md:text-3xl !mb-1">
          Collections
        </Typography>
        <Typography
          as="body-light"
          color="var(--consultationForm)"
          align="center"
          className="!mb-8 !text-base"
        >
          Discover curated jewellery collections featuring rare gems and handcrafted designs
        </Typography>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Navigation buttons - only on desktop */}
        {isSliderMounted && shouldShowNavigation && (
          <>
            <button
              onClick={() => handleScroll('prev', SLIDER_ID, sliderRef, collections.length, getVisibleSlides())}
              aria-label="Previous slide"
              className="absolute top-1/2 -left-5 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
              <SlArrowLeft className="text-[var(--primary)] text-2xl" />
            </button>
            <button
              onClick={() => handleScroll('next', SLIDER_ID, sliderRef, collections.length, getVisibleSlides())}
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
          {collections.map((collection, index) => (
            <div
              key={collection.id}
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
                  variant="collection"
                  imageUrl={collection.imageUrl}
                  title={collection.title}
                  href={collection.href}
                  imageAlt={collection.imageAlt}
                  imageAspect={collection.imageAspect}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSlider;