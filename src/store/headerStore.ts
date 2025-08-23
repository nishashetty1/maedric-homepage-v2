import { create } from "zustand";
import { useEffect } from "react";

interface HeaderState {
  isScrolled: boolean;
  isLargeScreen: boolean;
  headerHeight: number;
  setIsScrolled: (value: boolean) => void;
  setIsLargeScreen: (value: boolean) => void;
  setHeaderHeight: (value: number) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  isScrolled: false,
  isLargeScreen: true,
  headerHeight: 0,
  setIsScrolled: (value) => set({ isScrolled: value }),
  setIsLargeScreen: (value) => set({ isLargeScreen: value }),
  setHeaderHeight: (value) => set({ headerHeight: value }),
}));

// Hook to initialize and update header state
export const useHeaderEffects = () => {
  const { setIsLargeScreen, setIsScrolled } = useHeaderStore();
  
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1050);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Initial checks
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsLargeScreen, setIsScrolled]);
};