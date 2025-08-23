import { create } from 'zustand';

// Define testimonial data interface
export interface TestimonialData {
  id: number;
  name: string;
  location: string;
  quote: string;
  images: string[];
}

interface TestimonialsState {
  testimonials: TestimonialData[];
  currentTestimonial: number;
  currentImageSlide: number;
  
  // Actions
  nextTestimonial: () => void;
  prevTestimonial: () => void;
  setTestimonial: (index: number) => void;
  
  nextImageSlide: () => void;
  prevImageSlide: () => void;
  setImageSlide: (index: number) => void;
}

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  testimonials: [
    {
      id: 1,
      name: "Ivan Teo",
      location: "Singapore",
      quote:
        "I am beyond grateful to Maedric for helping me create the perfect engagement ring. With his/their expert guidance on diamond selection and design, we crafted a ring that my girlfriend absolutely adores. The craftsmanship and attention to detail were impeccable, and it was clear that Maedric genuinely cares about delivering the best.",
      images: [
        "/images/testimonials/testimonial1.png",
        "/images/testimonials/testimonial2.png",
      ],
    },
    {
      id: 2,
      name: "Ivan Teo",
      location: "Singapore",
      quote:
        "I am beyond grateful to Maedric for helping me create the perfect engagement ring. With his/their expert guidance on diamond selection and design, we crafted a ring that my girlfriend absolutely adores. The craftsmanship and attention to detail were impeccable, and it was clear that Maedric genuinely cares about delivering the best.",
      images: [
        "/images/testimonials/testimonial2.png",
      ],
    },
    {
      id: 3,
      name: "Ivan Teo",
      location: "Singapore",
      quote:
        "I am beyond grateful to Maedric for helping me create the perfect engagement ring. With his/their expert guidance on diamond selection and design, we crafted a ring that my girlfriend absolutely adores. The craftsmanship and attention to detail were impeccable, and it was clear that Maedric genuinely cares about delivering the best.",
      images: [
        "/images/testimonials/testimonial1.png",
      ],
    },
  ],
  currentTestimonial: 0,
  currentImageSlide: 0,
  
  nextTestimonial: () => set((state) => ({
    currentTestimonial: (state.currentTestimonial + 1) % state.testimonials.length,
    currentImageSlide: 0, // Reset image slide when changing testimonials
  })),
  
  prevTestimonial: () => set((state) => ({
    currentTestimonial: (state.currentTestimonial - 1 + state.testimonials.length) % state.testimonials.length,
    currentImageSlide: 0, // Reset image slide when changing testimonials
  })),
  
  setTestimonial: (index) => set(() => ({ 
    currentTestimonial: index,
    currentImageSlide: 0, // Reset image slide when changing testimonials
  })),
  
  nextImageSlide: () => set((state) => ({
    currentImageSlide: (state.currentImageSlide + 1) % 3, // 3 different image views
  })),
  
  prevImageSlide: () => set((state) => ({
    currentImageSlide: (state.currentImageSlide - 1 + 3) % 3, // 3 different image views
  })),
  
  setImageSlide: (index) => set(() => ({ 
    currentImageSlide: index 
  })),
}));