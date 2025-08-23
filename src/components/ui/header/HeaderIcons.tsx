"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { PiUser, PiShoppingCartSimple } from "react-icons/pi";

interface HeaderIconsProps {
  mobile?: boolean;
}

const HeaderIcons: React.FC<HeaderIconsProps> = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <button
        aria-label="Search"
        className="transition-transform duration-300 hover:scale-110"
      >
        <IoSearchOutline width={18} height={18} />
      </button>

      {/* WishList */}
      <button
        aria-label="Wishlist"
        className="relative transition-transform duration-300 hover:scale-110"
      >
        <GoHeart width={18} height={18} />
      </button>

      {/* Account */}
      <button
        aria-label="Account"
        className="transition-transform duration-300 hover:scale-110"
      >
        <PiUser width={18} height={18} />
      </button>

      {/* Cart */}
      <button
        aria-label="Cart"
        className="relative transition-transform duration-300 hover:scale-110"
      >
        <PiShoppingCartSimple width={18} height={18} />
        <span className="absolute -top-2 -right-2 bg-[var(--background)] text-[var(--primary)] rounded-full text-[8px] font-bold px-1 border border-[var(--primary)]">
          1
        </span>
      </button>
    </div>
  );
};

export default HeaderIcons;
