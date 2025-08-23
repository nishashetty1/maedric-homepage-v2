import { create } from "zustand";

// Shared types
export interface CategoryItem {
    name: string;
    image: string;
    href: string;
}

export type MenuType = "jewellery" | "gemstones";
export type TabType = "featured" | "type" | "collection";

interface MegaMenuState {
    // Shared data
    typeCategories: Record<MenuType, CategoryItem[]>;
    collectionCategories: Record<MenuType, CategoryItem[]>;
    featuredContent: Record<MenuType, {
        description: string;
        secondParagraph: string;
        thirdParagraph?: string;
        buttonLabel: string;
        buttonLink: string;
    }>;

    // Animation variants
    animations: {
        container: any;
        tabContent: any;
    };
}

export const useMegaMenuStore = create<MegaMenuState>(() => ({
    // Type categories
    typeCategories: {
        jewellery: [
            {
                name: "Ring",
                image: "/images/header/jewellery/ring.png",
                href: "/jewellery/rings",
            },
            {
                name: "Earrings",
                image: "/images/header/jewellery/earrings.png",
                href: "/jewellery/earings",
            },
            {
                name: "Necklace",
                image: "/images/header/jewellery/necklace.png",
                href: "/jewellery/necklace",
            },
            {
                name: "Bracelet",
                image: "/images/header/jewellery/bracelet.png",
                href: "/jewellery/bracelet",
            },
            {
                name: "Brooch",
                image: "/images/header/jewellery/brooch.png",
                href: "/jewellery/brooch",
            },
        ],
        gemstones: [
            {
                name: "Ruby",
                image: "/images/header/gemstones/ruby.jpg",
                href: "/gemstones/ruby",
            },
            {
                name: "Sapphire",
                image: "/images/header/gemstones/sapphire.jpg",
                href: "/gemstones/sapphire",
            },
            {
                name: "Emerald",
                image: "/images/header/gemstones/emerald.jpg",
                href: "/gemstones/emerald",
            },
            {
                name: "Diamond",
                image: "/images/header/gemstones/diamond.jpg",
                href: "/gemstones/diamond",
            },
        ],
    },

    // Collection categories
    collectionCategories: {
        jewellery: [
            {
                name: "Collection 1",
                image: "/images/our-collections/collection1.png",
                href: "/jewellery/collection1",
            },
            {
                name: "Collection 2",
                image: "/images/our-collections/collection2.png",
                href: "/jewellery/collection2",
            },
            {
                name: "Collection 3",
                image: "/images/our-collections/collection3.png",
                href: "/jewellery/collection3",
            },
            {
                name: "Collection 4",
                image: "/images/our-collections/collection4.png",
                href: "/jewellery/collection4",
            },
        ],
        gemstones: [
            {
                name: "Collection 1",
                image: "/images/our-collections/collection1.png",
                href: "/gemstones/collection1",
            },
            {
                name: "Collection 2",
                image: "/images/our-collections/collection2.png",
                href: "/gemstones/collection2",
            },
            {
                name: "Collection 3",
                image: "/images/our-collections/collection3.png",
                href: "/gemstones/collection3",
            },
            {
                name: "Collection 4",
                image: "/images/our-collections/collection4.png",
                href: "/gemstones/collection4",
            },
        ],
    },

    // Featured content
    featuredContent: {
        jewellery: {
            description:
                "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
            secondParagraph:
                "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
            thirdParagraph:
                'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
            buttonLabel: "CHECK THEM OUT",
            buttonLink: "/jewellery/featured",
        },
        gemstones: {
            description:
                "Each gemstone in our collection is carefully selected for its quality, beauty and rarity, ensuring you receive only the finest stones.",
            secondParagraph:
                "Our gemstones are ethically sourced from reputable mines around the world, and each one comes with a certificate of authenticity.",
            thirdParagraph:
                "Whether you're looking for a statement piece or a subtle accent, our collection offers something for every taste and occasion.",
            buttonLabel: "EXPLORE GEMSTONES",
            buttonLink: "/gemstones/featured",
        },
    },

    // Animation variants
    animations: {
        container: {
            hidden: { opacity: 0, y: -20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 }
            },
            exit: {
                opacity: 0,
                y: -20,
                transition: { duration: 0.2 }
            }
        },
        tabContent: {
            hidden: { opacity: 0, x: 20 },
            visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.3 }
            },
            exit: {
                opacity: 0,
                x: -20,
                transition: { duration: 0.2 }
            }
        }
    }
}));