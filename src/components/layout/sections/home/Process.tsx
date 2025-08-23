"use client";

import React, { useRef, useEffect } from "react";
import { Typography, Button } from "@/components/ui";
import { useProcessStore } from "@/store/processStore";
import Link from "next/link";
import Image from "next/image";

// Define process steps
const processSteps = [
  {
    id: 1,
    title: "Meet & Greet",
    description:
      "We begin with a warm conversation over coffee or tea to learn about you, your story, and what you envision for your piece. We'll discuss your preferences, budget, and materials.",
  },
  {
    id: 2,
    title: "Sketch and Prototyping",
    description:
      "Before our design consultation, you may bring a written description, a sketch, or an image. We will start with rough sketches to establish a design, followed by refinement through your feedback.",
  },
  {
    id: 3,
    title: "Brass Tacks and Deposit",
    description:
      "We will create an overview of timing milestones for your piece's timely arrival. Depending on complexity, a deposit of 50%—70% is required to commence the 3d modelling process.",
  },
  {
    id: 4,
    title: "Refinement & Approval",
    description:
      "During the refinement process, you will routinely receive 3d renders and a realistic resin model of your design to confirm fit and sizing as we refine your piece.",
  },
  {
    id: 5,
    title: "Creation & Polishing",
    description:
      "Our skilled artisans meticulously craft your piece with precision and care. Every detail is perfected through our rigorous quality control process before final delivery.",
  },
  {
    id: 6,
    title: "Completion & Delivery",
    description:
      "Maedric will deliver your bespoke piece with care, along with instructions on how to care for your piece and any certification if applicable.",
  },
];

const Process: React.FC = () => {
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    activeStep,
    totalSteps,
    scrollToStep,
    startAutoScroll,
    stopAutoScroll,
  } = useProcessStore();

  useEffect(() => {
    // Start auto-scrolling when component mounts
    startAutoScroll(mobileScrollContainerRef);

    // Handle scroll events on the mobile container
    const handleScroll = () => {
      if (mobileScrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          mobileScrollContainerRef.current;
        const scrollProgress = scrollLeft / (scrollWidth - clientWidth);

        // Calculate which step we're on based on scroll position
        const calculatedStep = Math.round(
          scrollProgress * (totalSteps - 1) + 1
        );

        // Only update if it's different from current step
        if (calculatedStep !== activeStep) {
          scrollToStep(calculatedStep, null); // Pass null to avoid scroll loop
        }
      }
    };

    // Add scroll event listener
    const currentRef = mobileScrollContainerRef.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      stopAutoScroll();
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, [activeStep, startAutoScroll, stopAutoScroll, scrollToStep, totalSteps]);

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Heading and Description */}
        <div className="flex flex-col space-y-4 lg:pr-8">
          <Typography as="h2" color="primary" align="center" className="!mb-3 text-2xl md:text-3xl">
            How Did We Get Here?
          </Typography>

          <Typography
            as="body-light"
            color="var(--consultationForm)"
            align="center"
            className="!mb-8 !text-base"
          >
            Every journey has a start and an end, hover over the buttons on the right to learn more about how we get from a cup of tea to your masterpiece.
          </Typography>

          <div className="flex justify-center">
            <Link href="/our-process">
              <Button variant="outlined" className="!px-8 ">
                LEARN MORE
              </Button>
            </Link>
          </div>

          {/* Craftsmanship Image (Desktop) */}
          <div className="hidden lg:block mt-6 relative h-full">
            <Image
              src="/images/process/craftsmanship.png"
              alt="Jewelry crafting process"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column - Process Steps */}
        <div className="relative">
          {/* Desktop Process Steps */}
          <div className="hidden lg:flex flex-col space-y-6 max-h-[650px] overflow-y-auto pr-4 ">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-start transition-opacity duration-300 ${
                  activeStep === step.id ? "opacity-100" : "opacity-70"
                }`}
              >
                <div className="flex-none mr-6">
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                      activeStep === step.id
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "border-[var(--primary)] text-[var(--primary)]"
                    }`}
                  >
                    <Typography as="h4" className="!mb-0">
                      {step.id}
                    </Typography>
                  </div>
                </div>
                <div className="flex-1">
                  <Typography
                    as="h4"
                    color="primary"
                    align="left"
                    className="!mb-2"
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    as="body"
                    color="var(--consultationForm)"
                    align="left"
                    className="!mb-0 !text-sm"
                  >
                    {step.description}
                  </Typography>
                  <div className="w-full h-px bg-[var(--border)] mt-6"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Process Steps */}
          <div className="lg:hidden">
            {/* Mobile Craftsmanship Image */}
            <div className="mb-6 relative h-[300px]">
              <Image
                src="/images/process/craftsmanship.png"
                alt="Jewelry crafting process"
                fill
                className="object-cover"
              />
            </div>

            {/* Mobile Process Steps Slider */}
            <div className="relative">
              <div
                ref={mobileScrollContainerRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
                onTouchStart={() => stopAutoScroll()} // Pause autoplay when user interacts
                onTouchEnd={() => {
                  startAutoScroll(mobileScrollContainerRef);
                }} // Resume after interaction
              >
                {processSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex-none w-full snap-start px-4"
                  >
                    <div className="flex items-start">
                      <div className="flex-none mr-4">
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                            activeStep === step.id
                              ? "border-[var(--accent)] text-[var(--accent)]"
                              : "border-[var(--primary)] text-[var(--primary)]"
                          }`}
                        >
                          <Typography as="h4" className="!mb-0">
                            {step.id}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Typography
                          as="h4"
                          color="primary"
                          align="left"
                          className="!mb-1 !font-medium"
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          as="body"
                          color="var(--consultationForm)"
                          align="left"
                          className="!mb-0"
                        >
                          {step.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Progress Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {processSteps.map((step) => (
                  <button
                    key={step.id}
                    aria-label={`Go to step ${step.id}`}
                    className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                      activeStep === step.id
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--border)]"
                    }`}
                    onClick={() => {
                      scrollToStep(step.id, mobileScrollContainerRef);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mobile CTA Button */}
            {/* <div className="mt-8 flex justify-center">
              <Link href="/our-process">
                <Button variant="outlined" className="!px-8">
                  LEARN MORE
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
