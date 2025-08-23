import { create } from "zustand";

// Types for links
interface FooterLink {
  label: string;
  href: string;
  hasChevron?: boolean;
}

interface PaymentMethod {
  name: string;
  image: string;
}

// Main store interface
interface FooterStore {
  // Newsletter state
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: (e: React.FormEvent) => void;
  
  // Current year for copyright
  currentYear: number;
  
  // Links configuration
  footerLinks: Record<string, FooterLink[]>;
  mobileLinks: FooterLink[];
  mobileFooterLinks: FooterLink[];
  
  // Payment methods
  paymentMethods: PaymentMethod[];
}

export const useFooterStore = create<FooterStore>((set, get) => ({
  // Newsletter state
  email: "",
  setEmail: (email) => set({ email }),
  
  handleSubscribe: (e) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    console.log("Subscribing email:", get().email);
    set({ email: "" });
    // You could add a toast notification or other feedback here
  },
  
  // Current year
  currentYear: new Date().getFullYear(),
  
  // Footer links with nested items
  footerLinks: {
    Explore: [
      { label: "Gemstones", href: "/gemstones" },
      { label: "Jewellery", href: "/jewellery" },
      { label: "Education", href: "/education" },
      { label: "Services", href: "/services" },
    ],
    Contact: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  
  // Mobile links
  mobileLinks: [
    { label: "Home", href: "/" },
    { label: "Gemstones", href: "/gemstones", hasChevron: true },
    { label: "Jewellery", href: "/jewellery", hasChevron: true },
    { label: "Services", href: "/services" },
    { label: "Education", href: "/education" },
  ],
  
  // Mobile footer links
  mobileFooterLinks: [
    { label: "About Us", href: "/about" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  
  // Payment methods
  paymentMethods: [
    { name: "Stripe", image: "/images/payments/stripe.jpg" },
    { name: "American Express", image: "/images/payments/amex.jpg" },
    { name: "Visa", image: "/images/payments/visa.jpg" },
    { name: "Mastercard", image: "/images/payments/mastercard.jpg" },
    { name: "JCB", image: "/images/payments/jcb.jpg" },
    { name: "Union Pay", image: "/images/payments/unionpay.jpg" },
    { name: "Atome", image: "/images/payments/atome.jpg" },
  ],
}));