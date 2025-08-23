"use client";

import React, { useEffect } from 'react';
import { HiOutlineArrowLongUp } from 'react-icons/hi2';
import { useScrollToTopStore } from '@/store/scrollToTopStore';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const { isVisible, setIsVisible, scrollToTop } = useScrollToTopStore();

  useEffect(() => {
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY;
      const isNearBottom = 
        window.innerHeight + scrollY >= document.body.offsetHeight - 500;
      const shouldBeVisible = scrollY > 400 && (isScrollingDown || isNearBottom);
      
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, setIsVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 p-3 bg-[var(--primary)] text-[var(--accent)] rounded-full shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ 
            y: -3,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Scroll to top"
        >
          <HiOutlineArrowLongUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;