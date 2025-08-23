import { create } from "zustand";
import { type MutableRefObject } from "react";

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

// Define the state shape
interface HeaderMobileState {
  // State
  mobileMenuOpen: boolean;
  activeDropdown: string | null;
  menuRef: MutableRefObject<HTMLDivElement | null> | null;
  links: NavLink[];
  dropdowns: Record<string, string[]>;
  
  // New state for the mega menu
  activeMobileMenu: "jewellery" | "gemstones" | null;
  activeMobileMenuTab: "featured" | "type" | "collection";
  
  // Actions
  toggleMobileMenu: (isOpen: boolean) => void;
  toggleDropdown: (menu: string) => void;
  closeMobileMenu: () => void;
  setMenuRef: (ref: MutableRefObject<HTMLDivElement | null>) => void;
  
  // New actions for mega menu
  openMobileMenu: (menu: "jewellery" | "gemstones") => void;
  closeMobileMenuView: () => void;
  setActiveMobileMenuTab: (tab: "featured" | "type" | "collection") => void;
}

// Create the Zustand store
export const useHeaderMobileStore = create<HeaderMobileState>((set) => ({
  // Initial state
  mobileMenuOpen: false,
  activeDropdown: null,
  menuRef: null,
  
  // New state for the mega menu
  activeMobileMenu: null,
  activeMobileMenuTab: "featured",
  
  // Navigation configuration
  links: [
    { label: "Home", href: "/" },
    { label: "Gemstones", href: "/gemstones", hasDropdown: true },
    { label: "Jewellery", href: "/jewellery", hasDropdown: true },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  
  // Dropdown content
  dropdowns: {
    "Gemstones": ["Featured", "Ruby", "Sapphire", "Emerald", "Diamond"],
    "Jewellery": ["Featured", "Rings", "Earring", "Necklaces", "Bracelets", "Brooches"],
  },
  
  // Actions
  toggleMobileMenu: (isOpen) => set({ mobileMenuOpen: isOpen }),
  
  toggleDropdown: (menu) => set((state) => ({ 
    activeDropdown: state.activeDropdown === menu ? null : menu 
  })),
  
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  
  setMenuRef: (ref) => set({ menuRef: ref }),
  
  // New actions for mega menu
  openMobileMenu: (menu) => set({ activeMobileMenu: menu }),
  
  closeMobileMenuView: () => set({ activeMobileMenu: null }),
  
  setActiveMobileMenuTab: (tab) => set({ activeMobileMenuTab: tab }),
}));

// Initialize hook for the component
export const useInitHeaderMobile = () => {
  return useHeaderMobileEffects();
};

// Create a separate hook for setting up event listeners
import { useRef, useEffect } from "react";

export const useHeaderMobileEffects = () => {
  const { 
    mobileMenuOpen, 
    setMenuRef, 
    toggleMobileMenu 
  } = useHeaderMobileStore();
  
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMenuRef(menuRef);
  }, [setMenuRef]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        toggleMobileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, toggleMobileMenu]);
  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  return { menuRef };
};