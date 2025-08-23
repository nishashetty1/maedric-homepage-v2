import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type FormType = "Default" | "Bridal" | "Boutique" | "Gemstone";

interface FormData {
  name: string;
  contactMethod: string;
  timing: string;
  occasion: string;
  occasionCustom: string;
  jewelry: string;
  jewelryCustom: string;
  gemstonesInvolved: string;
  designProcess: string;
  details: string;
  subscribe: boolean;
}

interface RangeValues {
  min: number;
  max: number;
}

interface ConsultationState {
  // Current active form type
  activeFormType: FormType;
  
  // Form data
  formData: FormData;
  
  // Budget range values for each form type
  rangeValues: {
    Bridal: RangeValues;
    Boutique: RangeValues;
    Gemstone: RangeValues;
  };
  
  // Active buttons for occasion and jewelry type
  activeOccasionBtn: string | null;
  activeJewelryBtn: string | null;
  
  // Which slider handle is being dragged
  draggedSlider: string | null;
  
  // Form text content for different form types
  formText: {
    title: Record<FormType, string>;
    subtitle: Record<FormType, string>;
    timingQuestion: Record<FormType, string>;
    occasionQuestion: Record<FormType, string>;
    textareaQuestion: Record<FormType, string>;
    budgetRange: Record<string, { min: number; max: number }>;
  };
  
  // Options for different form types
  occasionOptions: Record<string, any[]>;
  jewelryOptions: Record<string, any[]>;
  
  // Actions
  setActiveFormType: (type: FormType) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setRangeValue: (formType: FormType, handle: string, value: number) => void;
  setActiveOccasionBtn: (id: string | null) => void;
  setActiveJewelryBtn: (id: string | null) => void;
  setDraggedSlider: (slider: string | null) => void;
  resetForm: () => void;
}

// Define initial form data
const initialFormData: FormData = {
  name: '',
  contactMethod: 'Voice Call - Afternoon',
  timing: '4-6 Months',
  occasion: 'Anniversary',
  occasionCustom: '',
  jewelry: '',
  jewelryCustom: '',
  gemstonesInvolved: 'Yes, Maedric provides them',
  designProcess: 'Maedric takes the lead',
  details: '',
  subscribe: false,
};

export const useConsultationStore = create<ConsultationState>()(
  devtools(
    (set) => ({
      activeFormType: 'Default',
      formData: { ...initialFormData },
      
      rangeValues: {
        Default: { min: 10, max: 20 },
        Bridal: { min: 10, max: 20 },
        Boutique: { min: 10, max: 20 },
        Gemstone: { min: 20, max: 50 },
      },
      
      activeOccasionBtn: null,
      activeJewelryBtn: null,
      draggedSlider: null,
      
      formText: {
        title: {
          Default: "Let's Begin - Your Jewellery, Your Way",
          Bridal: "Let's Create the Perfect Wedding Piece Together",
          Boutique: "Make it unique, Make it yours.",
          Gemstone: "Lets source the perfect stone for you",
        },
        subtitle: {
          Default: "Let us source rare gemstones or craft bespoke pieces tailored just for you.",
          Bridal: "",
          Boutique: "",
          Gemstone: "",
        },
        timingQuestion: {
          Bridal: "When's the big day?",
          Boutique: "When do you want your creation by?",
          Gemstone: "How much time can we use to find what you need?",
          Default: "When do you want your creation by?",
        },
        occasionQuestion: {
          Bridal: "What's the occasion for your bridal jewellery?",
          Boutique: "What is the occasion?",
          Gemstone: "What group of gemstones are you interested in?",
          Default: "What is the occasion?",
        },
        textareaQuestion: {
          Bridal: "Tell us more about the jewellery you are looking for!",
          Boutique: "Tell us about the story behind your future heirloom!",
          Gemstone: "Let us know more about the stone(s) you would like us to acquire!",
          Default: "Tell us more about what you're looking for",
        },
        budgetRange: {
          Default: { min: 10, max: 20 },
          Bridal: { min: 10, max: 20 },
          Boutique: { min: 10, max: 20 },
          Gemstone: { min: 20, max: 50 },
        },
      },
      
      occasionOptions: {
        Bridal: [
          { value: 'proposal', label: 'Proposal' },
          { value: 'wedding', label: 'Wedding' },
          { value: 'other', label: 'Other', hasInput: true },
        ],
        Boutique: [
          { value: 'anniversary', label: 'Anniversary' },
          { value: 'birthday', label: 'Birthday' },
          { value: 'push-present', label: 'Push Present' },
          { value: 'graduation', label: 'Graduation' },
          { value: 'other', label: 'Other' },
        ],
        Gemstone: [
          { value: 'precious', label: 'Precious Coloured - Ruby/Sapphire/Emerald/Jade' },
          { value: 'semi-precious', label: 'Semi-Precious - Amethyst/Citrine/Peridot/Garnet' },
          { value: 'diamonds', label: 'Diamonds' },
        ],
      },
      
      jewelryOptions: {
        Bridal: [
          { value: 'proposal-ring', label: 'Proposal Ring' },
          { value: 'wedding-rings', label: 'Wedding Rings(Bands)' },
        ],
        Boutique: [
          { value: 'ring', label: 'Ring' },
          { value: 'earrings', label: 'Earrings' },
          { value: 'pendant', label: 'Pendant/Necklace' },
          { value: 'bracelet', label: 'Bracelet' },
          { value: 'brooch', label: 'Brooch' },
          { value: 'other', label: 'Other' },
        ],
        Gemstone: [
          { value: 'ring', label: 'Ring' },
          { value: 'earrings', label: 'Earrings' },
          { value: 'pendant', label: 'Pendant/Necklace' },
          { value: 'bracelet', label: 'Bracelet' },
          { value: 'brooch', label: 'Brooch' },
          { value: 'other', label: 'Other' },
        ],
      },
      
      setActiveFormType: (type) => 
        set((state) => ({ 
          activeFormType: type,
          // Reset active buttons when changing form type
          activeOccasionBtn: null,
          activeJewelryBtn: null
        })),
      
      handleInputChange: (e) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: type === 'checkbox' ? checked : value,
          },
        }));
      },
      
      handleSubmit: (e) => {
        e.preventDefault();
        const state = useConsultationStore.getState();
        console.log('Form submitted with data:', {
          formType: state.activeFormType,
          formData: state.formData,
          rangeValues: state.rangeValues[state.activeFormType === 'Default' ? 'Boutique' : state.activeFormType],
          occasionSelection: state.activeOccasionBtn,
          jewelrySelection: state.activeJewelryBtn,
        });
        
        // In a real application, you would submit this data to your backend
        alert('Appointment scheduled successfully!');
        state.resetForm();
      },
      
      setRangeValue: (formType, handle, value) => {
        if (formType === 'Default') formType = 'Boutique';
        
        set((state) => ({
          rangeValues: {
            ...state.rangeValues,
            [formType]: {
              ...state.rangeValues[formType],
              [handle]: value,
            },
          },
        }));
      },
      
      setActiveOccasionBtn: (id) => set(() => ({ activeOccasionBtn: id })),
      setActiveJewelryBtn: (id) => set(() => ({ activeJewelryBtn: id })),
      setDraggedSlider: (slider) => set(() => ({ draggedSlider: slider })),
      
      resetForm: () => set(() => ({ 
        formData: { ...initialFormData },
        activeOccasionBtn: null,
        activeJewelryBtn: null,
        activeFormType: 'Default'
      })),
    }),
    { name: 'consultation-store' }
  )
);