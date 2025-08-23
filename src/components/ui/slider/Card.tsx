import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export interface CardProps {
  /**
   * Card variant type
   */
  variant: "product" | "category" | "collection" | "feature";

  /**
   * Image URL
   */
  imageUrl: string;

  /**
   * Title/name for the card
   */
  title: string;

  /**
   * Description text (optional)
   */
  description?: string;

  /**
   * URL to navigate to when card is clicked
   */
  href: string;

  /**
   * Alt text for image
   */
  imageAlt: string;

  /**
   * Optional className for additional styling
   */
  className?: string;

  /**
   * Optional aspect ratio for the image (default: 1/1)
   */
  imageAspect?: "1/1" | "4/3" | "3/4" | "16/9";
}

/**
 * Card component for displaying products, categories, collections or features
 */
export const Card: React.FC<CardProps> = ({
  variant,
  imageUrl,
  title,
  description,
  href,
  imageAlt,
  className = "",
  imageAspect = "1/1",
}) => {
  // Styling based on variant
  const getCardStyles = () => {
    switch (variant) {
      case "product":
        return {
          container:
            "flex flex-col border border-[var(--accent)] rounded-none overflow-hidden h-full pt-4 px-4",
          image: "w-full h-auto object-cover aspect-square",
          content: "p-4",
          title:
            "text-left text-[18px] md:text-[20px] text-[var(--consultationForm)] !mb-0",
          description: "text-left !text-sm text-[var(--consultationForm)] mt-1 !mb-0",
        };

      case "category":
        return {
          container:
            "flex flex-col border border-[var(--accent)] rounded-none overflow-hidden h-full group px-4 pt-4",
          image: "w-full h-auto object-cover aspect-square",
          content: "p-4 flex justify-between items-center",
          title:
            "text-[20px] md:text-[22px] text-[var(--consultationForm)] !mb-0",
          description: "hidden",
        };

      case "collection":
        return {
          container:
            "flex flex-col border border-[var(--accent)] rounded-none overflow-hidden h-full group px-4 pt-4",
          image: "w-full h-auto object-cover",
          content: "p-4 flex justify-between items-center",
          title:
            "text-[20px] md:text-[22px] text-[var(--consultationForm)] !mb-0",
          description: "hidden",
        };

      case "feature":
        return {
          container:
            "flex flex-col border border-[var(--accent)] rounded-none overflow-hidden h-full relative group p-4",
          image: "w-full h-full object-cover aspect-[16/9]",
          content: "absolute bottom-0 left-0 right-0 p-5 md:p-6",
          title:
            "text-[24px] md:text-[28px] lg:text-[32px] text-white mb-1 text-left",
          description:
            "text-[24px] md:text-[28px] lg:text-[32px] text-white mb-1 text-left",
        };

      default:
        return {
          container: "",
          image: "",
          content: "",
          title: "",
          description: "",
        };
    }
  };

  const styles = getCardStyles();

  // Function to render the appropriate image aspect ratio
  const getImageStyle = () => {
    switch (imageAspect) {
      case "4/3":
        return "aspect-[4/3]";
      case "3/4":
        return "aspect-[3/4]";
      case "16/9":
        return "aspect-[16/9]";
      default:
        return "aspect-square";
    }
  };

  return (
    <Link href={href} className={`block ${className}`}>
      <div className={styles.container}>
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className={`relative ${getImageStyle()}`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className={`${styles.image} transition-transform duration-300 ${variant !== "product" ? "group-hover:scale-105" : ""}`}
              priority={false}
            />
            {/* Gradient Overlay */}
            {variant === "feature" && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[var(--primary)] opacity-80 z-0"></div>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className={styles.content}>
          {variant === "feature" ? (
            <>
              <div className="flex justify-between items-center px-4">
                <div>
                  <Typography as="h3" className={styles.title}>
                    {title}
                  </Typography>
                  {description && (
                    <Typography as="h3" className={styles.description}>
                      {description}
                    </Typography>
                  )}
                </div>
                <HiOutlineArrowLongRight className="text-white text-2xl mt-2 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </>
          ) : variant === "product" ? (
            <>
              <Typography as="subheading" className={styles.title}>
                {title}
              </Typography>
              {description && (
                <Typography as="subheading" className={styles.description}>
                  {description}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography as="body-light" className={styles.title}>
                {title}
              </Typography>
              <HiOutlineArrowLongRight className="text-[var(--primary)] text-xl transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
