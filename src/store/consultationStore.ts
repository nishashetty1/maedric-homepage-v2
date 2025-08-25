import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type FormType = "Default" | "Bridal" | "Boutique" | "Gemstone";

export const RING_SIZE_DATA = {
  standards: ["US", "UK", "HK"],
  sizes: {
    US: [
      "3",
      "3.25",
      "3.5",
      "3.75",
      "4",
      "4.25",
      "4.5",
      "4.75",
      "5",
      "5.25",
      "5.5",
      "5.75",
      "6",
      "6.25",
      "6.5",
      "6.75",
      "7",
      "7.25",
      "7.5",
      "7.75",
      "8",
      "8.25",
      "8.5",
      "8.75",
      "9",
      "9.25",
      "9.5",
      "9.75",
      "10",
      "10.25",
      "10.5",
      "10.75",
      "11",
      "11.25",
      "11.5",
      "11.75",
      "12",
      "12.25",
      "12.5",
      "12.75",
      "13",
      "13.25",
      "13.5",
      "13.75",
      "14",
      "14.25",
      "14.5",
      "14.75",
      "15",
      "15.25",
      "15.5",
      "15.75",
      "16",
    ],
    UK: [
      "A",
      "A 1/2",
      "B",
      "B 1/2",
      "C",
      "C 1/2",
      "D",
      "D 1/2",
      "E",
      "E 1/2",
      "F",
      "F 1/2",
      "G",
      "G 1/2",
      "H",
      "H 1/2",
      "I",
      "J",
      "J 1/2",
      "K",
      "K 1/2",
      "L",
      "L 1/2",
      "M",
      "M 1/2",
      "N",
      "N 1/2",
      "O",
      "O 1/2",
      "P",
      "P 1/2",
      "Q",
      "Q 1/2",
      "R",
      "R 1/2",
      "S",
      "S 1/2",
      "T",
      "T 1/2",
      "U",
      "U 1/2",
      "V",
      "V 1/2",
      "W",
      "W 1/2",
      "X",
      "X 1/2",
      "Y",
      "Z",
      "Z 1/2",
      "Z1",
      "Z2",
    ],
    HK: [
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
  },
  mmValues: {
    US: {
      "3": "14.1",
      "3.25": "14.3",
      "3.5": "14.5",
      "3.75": "14.7",
      "4": "14.9",
      "4.25": "15.1",
      "4.5": "15.3",
      "4.75": "15.5",
      "5": "15.7",
      "5.25": "15.9",
      "5.5": "16.1",
      "5.75": "16.3",
      "6": "16.5",
      "6.25": "16.7",
      "6.5": "16.9",
      "6.75": "17.1",
      "7": "17.3",
      "7.25": "17.5",
      "7.5": "17.7",
      "7.75": "17.9",
      "8": "18.1",
      "8.25": "18.3",
      "8.5": "18.5",
      "8.75": "18.7",
      "9": "18.9",
      "9.25": "19.2",
      "9.5": "19.4",
      "9.75": "19.6",
      "10": "19.8",
      "10.25": "20",
      "10.5": "20.2",
      "10.75": "20.4",
      "11": "20.6",
      "11.25": "20.8",
      "11.5": "21",
      "11.75": "21.2",
      "12": "21.4",
      "12.25": "21.6",
      "12.5": "21.8",
      "12.75": "22",
      "13": "22.2",
      "13.25": "22.4",
      "13.5": "22.6",
      "13.75": "22.8",
      "14": "23",
      "14.25": "23.2",
      "14.5": "23.4",
      "14.75": "23.6",
      "15": "23.8",
      "15.25": "24",
      "15.5": "24.2",
      "15.75": "24.4",
      "16": "24.6",
    },
    UK: {
      A: "12.04",
      "A 1/2": "12.24",
      B: "12.45",
      "B 1/2": "12.65",
      C: "12.85",
      "C 1/2": "13.06",
      D: "13.26",
      "D 1/2": "13.46",
      E: "13.67",
      "E 1/2": "13.87",
      F: "14.07",
      "F 1/2": "14.27",
      G: "14.48",
      "G 1/2": "14.68",
      H: "14.88",
      "H 1/2": "15.09",
      I: "15.29",
      J: "15.49",
      "J 1/2": "15.7",
      K: "15.9",
      "K 1/2": "16.1",
      L: "16.31",
      "L 1/2": "16.51",
      M: "16.71",
      "M 1/2": "16.92",
      N: "17.12",
      "N 1/2": "17.32",
      O: "17.53",
      "O 1/2": "17.73",
      P: "17.93",
      "P 1/2": "18.14",
      Q: "18.34",
      "Q 1/2": "18.54",
      R: "18.75",
      "R 1/2": "18.95",
      S: "19.15",
      "S 1/2": "19.35",
      T: "19.56",
      "T 1/2": "19.76",
      U: "19.96",
      "U 1/2": "20.17",
      V: "20.37",
      "V 1/2": "20.57",
      W: "20.78",
      "W 1/2": "20.98",
      X: "21.18",
      "X 1/2": "21.39",
      Y: "21.59",
      Z: "21.79",
      "Z 1/2": "22",
      Z1: "22.61",
      Z2: "23.01",
    },
    HK: {
      "5": "13.8",
      "6": "14.1",
      "7": "14.5",
      "8": "14.8",
      "9": "15.2",
      "10": "15.5",
      "11": "15.9",
      "12": "16.2",
      "13": "16.6",
      "14": "16.9",
      "15": "17.3",
      "16": "17.7",
      "17": "18",
      "18": "18.3",
      "19": "18.7",
      "20": "19",
      "21": "19.4",
      "22": "19.7",
      "23": "20.1",
      "24": "20.4",
      "25": "20.8",
      "26": "21.1",
      "27": "21.5",
      "28": "21.8",
      "29": "22.2",
      "30": "22.5",
    },
  },
};

interface FormData {
  // Common fields
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  deadline: string;
  details: string;
  subscribe: boolean;

  // Bridal specific fields
  occasion: string;
  occasionCustom: string;
  ringSize: string;
  ringSizeKnown: boolean;
  designProcess: string;
  ringBox: string;
  budget: string;

  // Boutique specific fields
  eventType: string;
  eventTypeCustom: string;
  jewelryTypes: string[];
  gemstonesInvolved: string;

  // Gemstone specific fields
  helpType: string;
  helpTypeCustom: string;
  gemstoneGroup: string;
  certification: string;
  sourcingBudget: string;
}

interface ConsultationState {
  // Current active form type
  activeFormType: FormType;

  // Form data
  formData: FormData;
  ringStandard: string;

  // Active buttons
  activeOccasionBtn: string | null;
  activeJewelryBtn: string | null;
  activeJewelryTypes: string[];

  // Form text content for different form types
  formText: {
    title: Record<FormType, string>;
    subtitle: Record<FormType, string>;
    deadlineQuestion: Record<FormType, string>;
    occasionQuestion: Record<FormType, string>;
    textareaQuestion: Record<FormType, string>;
    textareaPlaceholder: Record<FormType, string>;
    budgetRange: Record<string, { min: number; max: number }>;
  };

  // Options for different form types
  occasionOptions: Record<string, any[]>;
  jewelryOptions: Record<string, any[]>;
  deadlineOptions: string[];
  designProcessOptions: string[];
  helpTypeOptions: any[];
  gemstoneGroupOptions: any[];
  certificationOptions: string[];
  budgetOptions: Record<FormType, string[]>;

  // Actions
  setActiveFormType: (type: FormType) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setActiveOccasionBtn: (id: string | null) => void;
  setActiveJewelryBtn: (id: string | null) => void;
  toggleJewelryType: (type: string) => void;
  setRingStandard: (standard: string) => void;
  getRingSizeWithMm: (size: string) => string;
  resetForm: () => void;
}

// Define initial form data
const initialFormData: FormData = {
  // Common fields
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
  deadline: "",
  details: "",
  subscribe: false,

  // Bridal specific fields
  occasion: "",
  occasionCustom: "",
  ringSize: "",
  ringSizeKnown: true,
  designProcess: "",
  ringBox: "",
  budget: "",

  // Boutique specific fields
  eventType: "",
  eventTypeCustom: "",
  jewelryTypes: [],
  gemstonesInvolved: "",

  // Gemstone specific fields
  helpType: "",
  helpTypeCustom: "",
  gemstoneGroup: "",
  certification: "",
  sourcingBudget: "",
};

export const useConsultationStore = create<ConsultationState>()(
  devtools(
    (set, get) => ({
      activeFormType: "Default",
      formData: { ...initialFormData },

      ringStandard: "US",

      activeOccasionBtn: null,
      activeJewelryBtn: null,
      activeJewelryTypes: [],
      draggedSlider: null,

      formText: {
        title: {
          Default: "Let's Begin - Your Jewellery, Your Way",
          Bridal: "Let's Create the Perfect Wedding Piece Together",
          Boutique: "Make it unique, Make it yours.",
          Gemstone: "Let's source the perfect stone for you",
        },
        subtitle: {
          Default:
            "Let us source rare gemstones or craft bespoke pieces tailored just for you.",
          Bridal: "",
          Boutique: "",
          Gemstone: "",
        },
        deadlineQuestion: {
          Bridal: "How soon is your big day?",
          Boutique: "When do you want your creation by?",
          Gemstone: "How much time can we use to find what you need?",
          Default: "When do you want your creation by?",
        },
        occasionQuestion: {
          Bridal: "What's the occasion for your bridal jewellery?",
          Boutique: "What's the occasion?",
          Gemstone: "What group of gemstones are you interested in?",
          Default: "What is the occasion?",
        },
        textareaQuestion: {
          Bridal: "Tell us more about the jewellery you are looking for!",
          Boutique: "Tell us about the story behind your future heirloom!",
          Gemstone:
            "Let us know more about the stone(s) you would like us to acquire!",
          Default: "Tell us more about what you're looking for",
        },
        textareaPlaceholder: {
          Bridal:
            "Any additional details like shared stories for us to consider?",
          Boutique:
            "Any additional details like shared stories for us to consider?",
          Gemstone:
            "Any specific characteristics or requirements for the stones?",
          Default: "Any additional details for us to consider?",
        },
        budgetRange: {
          Bridal: { min: 1, max: 20 },
          Boutique: { min: 3, max: 30 },
          Gemstone: { min: 5, max: 100 },
        },
      },

      occasionOptions: {
        Bridal: [
          { value: "proposal", label: "Proposal" },
          { value: "wedding", label: "Wedding" },
          { value: "other", label: "It's something else", hasInput: true },
        ],
        Boutique: [
          { value: "anniversary", label: "Anniversary" },
          { value: "career-milestone", label: "Career Milestone" },
          { value: "treat", label: "Treat myself/my SO" },
          { value: "other", label: "It's something else", hasInput: true },
        ],
        Gemstone: [],
      },

      jewelryOptions: {
        Bridal: [
          { value: "proposal-ring", label: "Proposal Ring" },
          { value: "wedding-rings", label: "Wedding Rings(Bands)" },
        ],
        Boutique: [
          { value: "ring", label: "Ring" },
          { value: "earrings", label: "Earrings" },
          { value: "pendant", label: "Pendant/Necklace" },
          { value: "bracelet", label: "Bracelet" },
          { value: "brooch", label: "Brooch" },
          { value: "other", label: "Other" },
        ],
        Gemstone: [],
      },

      deadlineOptions: ["<2 months", "2-4 months", "4-6 months", ">6 months"],

      designProcessOptions: [
        "Follow my instructions exactly",
        "I am confident, but appreciate recommendations",
        "I have some ideas that need clarification",
        "Maedric takes the lead in designing",
      ],

      helpTypeOptions: [
        {
          value: "investment",
          label: "Investment stones to diversify my portfolio",
        },
        { value: "rare", label: "Rare stones/inclusions to collect" },
        { value: "display", label: "Beautiful gems to admire and display" },
        { value: "other", label: "It's something else", hasInput: true },
      ],

      gemstoneGroupOptions: [
        { value: "diamonds", label: "Diamonds/Coloured Diamonds" },
        {
          value: "precious",
          label: "Precious coloured – Ruby/Sapphire/Emerald/Jade",
        },
        { value: "others", label: "All other types" },
      ],

      certificationOptions: [
        "Yes, Auction Grade",
        "Yes, Local certification",
        "No, Maedric certification only",
      ],

      budgetOptions: {
        Bridal: ["1-3k", "3-5k", "5-10k", "10-20k", ">20k"],
        Boutique: ["3-5k", "5-10k", "10-15k", "15-30k", ">30k"],
        Gemstone: ["5k-10k", "10k-20k", "20k-50k", "50k-100k", ">100k"],
        Default: [],
      },

      setActiveFormType: (type) =>
        set((state) => ({
          activeFormType: type,
          // Reset active buttons when changing form type
          activeOccasionBtn: null,
          activeJewelryBtn: null,
          activeJewelryTypes: [],
        })),

      setRingStandard: (standard) => {
        set({ ringStandard: standard });
        // Clear the current ring size when standard changes
        set((state) => ({
          formData: {
            ...state.formData,
            ringSize: "",
          },
        }));
      },

      handleInputChange: (e) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: type === "checkbox" ? checked : value,
          },
        }));
      },

      handleSubmit: (e) => {
        e.preventDefault();
        const state = get();
        console.log("Form submitted with data:", {
          formType: state.activeFormType,
          formData: state.formData,
          occasionSelection: state.activeOccasionBtn,
          jewelrySelection: state.activeJewelryBtn,
          jewelryTypes: state.activeJewelryTypes,
        });

        // Submit this data to your backend
        alert("Appointment scheduled successfully!");
        state.resetForm();
      },

      setActiveOccasionBtn: (id) => set(() => ({ activeOccasionBtn: id })),
      setActiveJewelryBtn: (id) => set(() => ({ activeJewelryBtn: id })),

      toggleJewelryType: (type) => {
        set((state) => {
          const types = [...state.activeJewelryTypes];
          const index = types.indexOf(type);

          if (index > -1) {
            types.splice(index, 1);
          } else {
            types.push(type);
          }

          return { activeJewelryTypes: types };
        });
      },

      getRingSizeWithMm: (size) => {
        if (!size) return "Select";

        const { ringStandard } = get();
        const mmValue =
          RING_SIZE_DATA.mmValues[
            ringStandard as keyof typeof RING_SIZE_DATA.mmValues
          ]?.[
            size as keyof (typeof RING_SIZE_DATA.mmValues)[keyof typeof RING_SIZE_DATA.mmValues]
          ];

        return `${size} (${mmValue}mm)`;
      },

      resetForm: () =>
        set(() => ({
          formData: { ...initialFormData },
          activeOccasionBtn: null,
          activeJewelryBtn: null,
          activeJewelryTypes: [],
          activeFormType: "Default",
        })),
    }),
    { name: "consultation-store" }
  )
);
