import { create } from 'zustand';
import { RefObject } from 'react';

interface SliderState {
  // Map of slider IDs to their active indices
  sliders: Record<string, number>;
  
  // Map to track mounted status for each slider
  isMounted: Record<string, boolean>;
  
  // Map to track navigation visibility for each slider
  showNavigation: Record<string, boolean>;
  
  // Set the active index for a specific slider
  setActiveIndex: (sliderId: string, index: number) => void;
  
  // Set mounted status for a slider
  setIsMounted: (sliderId: string, isMounted: boolean) => void;
  
  // Set navigation visibility for a slider
  setShowNavigation: (sliderId: string, show: boolean) => void;
  
  // Move to the next slide for a specific slider
  nextSlide: (sliderId: string, totalSlides: number, visibleSlides: number) => void;
  
  // Move to the previous slide for a specific slider
  prevSlide: (sliderId: string, totalSlides: number, visibleSlides: number) => void;
  
  // Handle scroll navigation for a slider - fixed type definition
  handleScroll: (
    direction: 'next' | 'prev', 
    sliderId: string, 
    sliderRef: RefObject<HTMLDivElement | null> | React.MutableRefObject<HTMLDivElement | null>, 
    totalSlides: number, 
    visibleSlides: number
  ) => void;
}

export const useSliderStore = create<SliderState>((set, get) => ({
  sliders: {},
  isMounted: {},
  showNavigation: {},
  
  setActiveIndex: (sliderId, index) =>
    set((state) => ({
      sliders: {
        ...state.sliders,
        [sliderId]: index,
      },
    })),
    
  setIsMounted: (sliderId, isMounted) =>
    set((state) => ({
      isMounted: {
        ...state.isMounted,
        [sliderId]: isMounted,
      },
    })),
    
  setShowNavigation: (sliderId, show) =>
    set((state) => ({
      showNavigation: {
        ...state.showNavigation,
        [sliderId]: show,
      },
    })),
    
  nextSlide: (sliderId, totalSlides, visibleSlides) =>
    set((state) => {
      const currentIndex = state.sliders[sliderId] || 0;
      const maxIndex = Math.max(0, totalSlides - Math.floor(visibleSlides));
      const nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
      
      return {
        sliders: {
          ...state.sliders,
          [sliderId]: nextIndex,
        },
      };
    }),
    
  prevSlide: (sliderId, totalSlides, visibleSlides) =>
    set((state) => {
      const currentIndex = state.sliders[sliderId] || 0;
      const maxIndex = Math.max(0, totalSlides - Math.floor(visibleSlides));
      const prevIndex = currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
      
      return {
        sliders: {
          ...state.sliders,
          [sliderId]: prevIndex,
        },
      };
    }),
    
  handleScroll: (direction, sliderId, sliderRef, totalSlides, visibleSlides) => {
    const { nextSlide, prevSlide } = get();
    
    if (!sliderRef.current) return;
    
    const containerWidth = sliderRef.current.clientWidth;
    const scrollAmount = containerWidth * 0.85; // Approximately one card + gap
    
    if (direction === 'next') {
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      nextSlide(sliderId, totalSlides, visibleSlides);
    } else {
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
      prevSlide(sliderId, totalSlides, visibleSlides);
    }
  }
}));