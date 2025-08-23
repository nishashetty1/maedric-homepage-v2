import { create } from 'zustand';
import { MutableRefObject, RefObject } from 'react';

interface ProcessState {
  // Current active step in the process (1-based index)
  activeStep: number;
  
  // Total number of steps
  totalSteps: number;
  
  // Function to set the active step
  setActiveStep: (step: number) => void;
  
  // Function to go to the next step
  nextStep: () => void;
  
  // Function to go to the previous step
  prevStep: () => void;
  
  // Function to handle scrolling to a specific step
  // Fixed: Using any to avoid TypeScript narrowing issues
  scrollToStep: (
    step: number, 
    scrollContainerRef: any
  ) => void;
  
  // Auto-scroll timer ID for cleanup
  autoScrollInterval: number | null;
  
  // Start auto-scrolling through steps
  // Fixed: Using any to avoid TypeScript narrowing issues
  startAutoScroll: (scrollContainerRef: any) => void;
  
  // Stop auto-scrolling
  stopAutoScroll: () => void;
}

export const useProcessStore = create<ProcessState>((set, get) => ({
  activeStep: 1,
  totalSteps: 6,
  autoScrollInterval: null,
  
  setActiveStep: (step) => {
    set((state) => ({
      activeStep: Math.min(Math.max(1, step), state.totalSteps)
    }));
  },
  
  nextStep: () => {
    set((state) => {
      const nextStep = state.activeStep < state.totalSteps 
        ? state.activeStep + 1 
        : 1; // Loop back to first step
      return { activeStep: nextStep };
    });
  },
  
  prevStep: () => {
    set((state) => {
      const prevStep = state.activeStep > 1 
        ? state.activeStep - 1 
        : state.totalSteps; // Loop back to last step
      return { activeStep: prevStep };
    });
  },
  
  scrollToStep: (step, scrollContainerRef) => {
    const { setActiveStep } = get();
    
    // Set the active step in the store
    setActiveStep(step);
    
    // Check if we have a valid ref and it has a current value
    if (scrollContainerRef?.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const maxScroll = scrollWidth - containerWidth;
      
      // Calculate the scroll position based on the step
      const scrollPosition = ((step - 1) / (get().totalSteps - 1)) * maxScroll;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  },
  
  startAutoScroll: (scrollContainerRef) => {
    const { nextStep, scrollToStep, stopAutoScroll } = get();
    
    // Clear any existing interval first
    stopAutoScroll();
    
    // Set a new interval
    const intervalId = window.setInterval(() => {
      nextStep();
      scrollToStep(get().activeStep, scrollContainerRef);
    }, 3000); // Change slide every 3 seconds
    
    // Store the interval ID for cleanup
    set({ autoScrollInterval: intervalId });
  },
  
  stopAutoScroll: () => {
    const { autoScrollInterval } = get();
    
    if (autoScrollInterval !== null) {
      window.clearInterval(autoScrollInterval);
      set({ autoScrollInterval: null });
    }
  }
}));