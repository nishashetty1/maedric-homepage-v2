"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@/components/ui";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useTestimonialsStore } from "@/store/testimonialsStore";

const Testimonials: React.FC = () => {
  const {
    testimonials,
    currentTestimonial,
    currentImageSlide,
    nextTestimonial,
    prevTestimonial,
    setTestimonial,
  } = useTestimonialsStore();

  // State to track if expanded quotes are shown on mobile
  const [expandedQuotes, setExpandedQuotes] = useState<Record<number, boolean>>({});

  // Reset expanded state when testimonial changes
  useEffect(() => {
    // Reset expanded state for the new testimonial
    setExpandedQuotes({});
  }, [currentTestimonial]);

  // Get current testimonial data
  const testimonial = testimonials[currentTestimonial];

  // Function to toggle expanded quote for a specific testimonial with event prevention
  const toggleExpandQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Stop event propagation to prevent swipe detection
    e.stopPropagation();
    e.preventDefault();

    setExpandedQuotes(prev => ({
      ...prev,
      [testimonial.id]: !prev[testimonial.id]
    }));
  };

  // Check if current testimonial quote is expanded
  const isCurrentQuoteExpanded = expandedQuotes[testimonial.id] || false;

  // Function to handle touch swipe for mobile
  const handleTouchStart = React.useRef<number>(0);
  const handleTouchMove = React.useRef<number>(0);
  const isSwiping = React.useRef<boolean>(false);

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = e.targetTouches[0].clientX;
    isSwiping.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    handleTouchMove.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!isSwiping.current) return;

    const diff = handleTouchStart.current - handleTouchMove.current;

    // Threshold of 50px for swipe
    if (diff > 50) {
      // Swipe left, show next testimonial
      nextTestimonial();
    } else if (diff < -50) {
      // Swipe right, show previous testimonial
      prevTestimonial();
    }

    isSwiping.current = false;
  };

  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:block w-full py-16 px-10">
        <div className="max-w-6xl mx-auto px-4">
          <Typography as="h2" align="center" color="primary" className="!mb-2 text-2xl md:text-3xl">
            Experiences To Cherish
          </Typography>
          <Typography as="body-light" align="center" color="var(--consultationForm)" className="mb-12 !text-base">
            Real stories from those who wear Maedric with pride.
          </Typography>

          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Arrows - Only on Desktop */}
            <button
              onClick={prevTestimonial}
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              aria-label="Previous slide"
              type="button"
            >
              <SlArrowLeft className="text-[var(--primary)] text-2xl" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              aria-label="Next slide"
              type="button"
            >
              <SlArrowRight className="text-[var(--primary)] text-2xl" />
            </button>

            <div className="flex flex-col lg:flex-row max-w-6xl gap-10 items-center">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentTestimonial}-${currentImageSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full aspect-square md:aspect-auto md:h-[400px]"
                  >
                    {/* Combined view - Main design as shown in images */}
                    <div className="relative h-full aspect-square shadow-lg">
                      {/* Main person image */}
                      <Image
                        src={testimonial.images[0]}
                        alt={`${testimonial.name} from ${testimonial.location}`}
                        fill
                        className="object-cover shadow-xl"
                        sizes="100vw"
                        priority
                      />

                      {/* Jewelry overlay image */}
                      {testimonial.images[1] && (
                        <div className="absolute -right-20 bottom-40 w-30 h-30 shadow-xl">
                          <Image
                            src={testimonial.images[1]}
                            alt="Jewelry close-up"
                            fill
                            className="object-cover"
                            sizes="150px"
                            priority
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <blockquote className="text-[var(--primary)]">
                      <Typography
                        as="body-light"
                        align="justify"
                        color="var(--consultationForm)"
                        className="mb-8 !text-base"
                      >
                        "{testimonial.quote}"
                      </Typography>

                      <Typography
                        as="h4"
                        align="right"
                        color="primary"
                        className="!mb-0"
                      >
                        {testimonial.name} , {testimonial.location}
                      </Typography>
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile View - With swipe functionality */}
      <section
        className="md:hidden w-full py-5 px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="mx-auto">
          <Typography as="h2" align="center" color="primary" className="mb-4">
            Experiences To Cherish
          </Typography>
          <Typography as="body-light" align="center" color="var(--consultationForm)" className="mb-8">
            Real stories from those who wear Maedric with pride.
          </Typography>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative w-2/3 aspect-square mb-6 shadow-xl mx-auto">
                {/* Main image */}
                <Image
                  src={testimonial.images[0]}
                  alt={`${testimonial.name} from ${testimonial.location}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />

                {/* Jewelry overlay image */}
                {testimonial.images[1] && (
                  <div className="absolute bottom-15 -right-15 w-24 h-24 shadow-xl">
                    <Image
                      src={testimonial.images[1]}
                      alt="Jewelry close-up"
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                )}
              </div>

              {/* Quote Text */}
              <div className="text-[var(--primary)]" onClick={(e) => e.stopPropagation()}>
                {isCurrentQuoteExpanded ? (
                  // Full quote when expanded
                  <div className="mb-6">
                    <Typography
                      as="body-light"
                      align="justify"
                      color="var(--consultationForm)"
                      className="text-sm"
                    >
                      "{testimonial.quote}"
                      <button
                        className="text-[var(--accent)] ml-1 cursor-pointer text-sm border-none bg-transparent p-0 inline-flex align-baseline"
                        onClick={toggleExpandQuote}
                        type="button"
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          isSwiping.current = false;
                        }}
                      >
                        read less
                      </button>
                    </Typography>
                  </div>
                ) : (
                  // Truncated quote with read more
                  <div className="mb-6">
                    <Typography
                      as="body-light"
                      align="left"
                      color="var(--consultationForm)"
                      className="text-sm"
                    >
                      "I am beyond grateful to Maedric for helping me create the perfect engagement ring. With their expert guidance on diamond...
                      <button
                        className="text-[var(--accent)] ml-1 cursor-pointer text-sm border-none bg-transparent p-0 inline-flex align-baseline"
                        onClick={toggleExpandQuote}
                        type="button"
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          isSwiping.current = false;
                        }}
                      >
                        read more
                      </button>
                    </Typography>
                  </div>
                )}

                <Typography
                  as="h4"
                  align="center"
                  color="primary"
                  className="!mb-0 !text-xl"
                >
                  {testimonial.name} · {testimonial.location}
                </Typography>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentTestimonial === index
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--border)]"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;