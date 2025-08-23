"use client";
import React, { useEffect, useRef } from "react";
import { Card, Typography } from "@/components/ui";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSliderStore } from "@/store/sliderStore";
import { desc } from "motion/react-client";

// Sample product data
const products = [
  {
    id: 1,
    imageUrl: "/images/product/product1.png",
    title: "Product 1",
    description: "Description for Product 1",
    href: "/products/product1",
    imageAlt: "Jewelry product 1",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 2,
    imageUrl: "/images/product/product2.png",
    title: "Product 2",
    description: "Description for Product 2",
    href: "/products/product2",
    imageAlt: "Jewelry product 2",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 3,
    imageUrl: "/images/product/product3.png",
    title: "Product 3",
    description: "Description for Product 3",
    href: "/products/product3",
    imageAlt: "Jewelry product 3",
    imageAspect: "3/4" as "3/4",
  },
  {
    id: 4,
    imageUrl: "/images/product/product4.png",
    title: "Product 4",
    description: "Description for Product 4",
    href: "/products/product4",
    imageAlt: "Jewelry product 4",
    imageAspect: "3/4" as "3/4",
  },
];

const SLIDER_ID = "products-slider";

const ProductSlider: React.FC = () => {
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
          Popular Jewellery
        </Typography>
        <Typography
          as="body-light"
          color="var(--consultationForm)"
          align="center"
          className="!mb-8 !text-base max-w-2xl mx-auto"
        >
          Discover what everyone's loving right now — our most popular pieces, handpicked based on what's trending with Maedric customers this season.
        </Typography>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Navigation buttons - only on desktop */}
        {isSliderMounted && shouldShowNavigation && (
          <>
            <button
              onClick={() => handleScroll('prev', SLIDER_ID, sliderRef, products.length, getVisibleSlides())}
              aria-label="Previous slide"
              className="absolute top-1/2 -left-5 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
              <SlArrowLeft className="text-[var(--primary)] text-2xl" />
            </button>
            <button
              onClick={() => handleScroll('next', SLIDER_ID, sliderRef, products.length, getVisibleSlides())}
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
          {products.map((product, index) => (
            <div
              key={product.id}
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
                  variant="product"
                  imageUrl={product.imageUrl}
                  title={product.title}
                  description={product.description}
                  href={product.href}
                  imageAlt={product.imageAlt}
                  imageAspect={product.imageAspect}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;