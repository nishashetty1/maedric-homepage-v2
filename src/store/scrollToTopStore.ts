import { create } from 'zustand';

interface ScrollToTopState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  scrollToTop: () => void;
}

export const useScrollToTopStore = create<ScrollToTopState>((set) => ({
  isVisible: false,
  setIsVisible: (visible: boolean) => set({ isVisible: visible }),
  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
}));