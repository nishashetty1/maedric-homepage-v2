import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { Typography } from "@/components/ui";
import { CategoryItem } from "@/store/megaMenuStore";

interface CategoryGridProps {
  items: CategoryItem[];
  columns: 2 | 3;
  onItemClick?: () => void;
  isMobile?: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  items,
  columns,
  onItemClick,
  isMobile = false
}) => {
  // Create grid classes based on props
  const gridColsClass = columns === 2 ? "grid-cols-2" : "grid-cols-3";
  const gapClass = "gap-2";
  
  return (
    <div className={`grid ${gridColsClass} ${gapClass}`}>
      {items.map((item) => (
        <div key={item.name} className="w-full">
          <Link href={item.href} onClick={onItemClick}>
            <div className={`border ${isMobile ? 'border-gray-200' : 'border-[var(--accent)]'} rounded-none overflow-hidden group relative`}>
              <div className="aspect-square overflow-hidden max-h-[160px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2 flex justify-between items-center">
                {isMobile ? (
                  <span className="text-[var(--primary)] text-sm">{item.name}</span>
                ) : (
                  <Typography
                    as="body"
                    align="left"
                    className="text-[var(--consultationForm)] font-medium !mb-0 text-sm"
                  >
                    {item.name}
                  </Typography>
                )}
                <IoArrowForward
                  className="text-[var(--accent)] transform group-hover:translate-x-1 transition-transform duration-300"
                  size={16}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;