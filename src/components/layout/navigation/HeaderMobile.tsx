"use client";

import React from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline, IoCallOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useHeaderMobileStore } from "@/store/headerMobileStore";
import { HeaderLogo, HeaderIcons, MegaMenuTabs, FeaturedContent, CategoryGrid } from "@/components/ui";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useMegaMenuStore } from "@/store/megaMenuStore";

const HeaderMobile: React.FC = () => {
  const {
    mobileMenuOpen,
    menuRef,
    links,
    activeMobileMenu,
    activeMobileMenuTab,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    closeMobileMenuView,
    setActiveMobileMenuTab
  } = useHeaderMobileStore();

  const { typeCategories, collectionCategories, featuredContent, animations } = useMegaMenuStore();

  // Handle item click (closes menus)
  const handleItemClick = () => {
    closeMobileMenuView();
    closeMobileMenu();
  };

  return (
    <>
      {/* Regular mobile header (always visible) */}
      <header className="relative z-50 shadow-md bg-[var(--background)]/40 md:hidden">
        <div className="w-full text-[var(--primary)] border-b-[0.2px] border-[var(--default-border)]">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex justify-start w-full">
              <HeaderLogo isCompact={true} />
            </div>
            <button
              onClick={() => toggleMobileMenu(true)}
              aria-label="Open menu"
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-white text-[var(--primary)] flex flex-col"
          >
            {/* Fixed header for the mobile menu */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200">
              <HeaderLogo isCompact={true} />
              <div className="flex items-center gap-4">
                <HeaderIcons />
                <motion.button
                  onClick={() => toggleMobileMenu(false)}
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <IoCloseOutline size={24} />
                </motion.button>
              </div>
            </div>

            {/* Content area that slides */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {activeMobileMenu === null ? (
                  <motion.div
                    key="main-menu"
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full w-full"
                  >
                    <div className="flex-1 overflow-y-auto">
                      <nav>
                        <ul className="divide-y divide-gray-200">
                          {links.map((link) => (
                            <li key={link.label} className="border-b border-gray-200">
                              {(link.label === "Jewellery" || link.label === "Gemstones") ? (
                                <motion.div
                                  className="flex justify-between items-center py-6 px-6"
                                  onClick={() => openMobileMenu(link.label.toLowerCase() as "jewellery" | "gemstones")}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="uppercase text-[15px] tracking-wider">
                                    {link.label}
                                  </span>
                                  <HiOutlineArrowLongRight size={22} />
                                </motion.div>
                              ) : (
                                <motion.div whileTap={{ scale: 0.98 }}>
                                  <Link
                                    href={link.href}
                                    className="flex justify-between items-center py-6 px-6"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="uppercase text-[15px] tracking-wider">{link.label}</span>
                                  </Link>
                                </motion.div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mega-menu"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full w-full"
                  >
                    {/* Mobile Mega Menu Header */}
                    <div className="flex items-center p-3 border-b border-gray-200">
                      <button
                        onClick={closeMobileMenuView}
                        className="flex items-center gap-2"
                      >
                        <HiOutlineArrowLongLeft size={20} />
                        <span className="uppercase text-[15px] tracking-widest">
                          {activeMobileMenu}
                        </span>
                      </button>
                    </div>

                    {/* Tabs navigation */}
                    <MegaMenuTabs
                      activeTab={activeMobileMenuTab}
                      setActiveTab={setActiveMobileMenuTab}
                      isMobile={true}
                    />

                    {/* Tab content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <AnimatePresence mode="wait">
                        {/* Featured Content */}
                        {activeMobileMenuTab === "featured" && activeMobileMenu && (
                          <motion.div
                            key="featured"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animations.tabContent}
                          >
                            <FeaturedContent 
                              content={featuredContent[activeMobileMenu]} 
                              isMobile={true} 
                              onButtonClick={handleItemClick}
                            />
                          </motion.div>
                        )}

                        {/* By Type */}
                        {activeMobileMenuTab === "type" && activeMobileMenu && (
                          <motion.div
                            key="type"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animations.tabContent}
                          >
                            <CategoryGrid 
                              items={typeCategories[activeMobileMenu]} 
                              columns={2} 
                              isMobile={true}
                              onItemClick={handleItemClick}
                            />
                          </motion.div>
                        )}

                        {/* By Collection */}
                        {activeMobileMenuTab === "collection" && activeMobileMenu && (
                          <motion.div
                            key="collection"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animations.tabContent}
                          >
                            <CategoryGrid 
                              items={collectionCategories[activeMobileMenu]} 
                              columns={2}
                              isMobile={true}
                              onItemClick={handleItemClick}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with phone number */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Link
                href="tel:6583433698"
                className="flex items-center justify-center gap-2 text-[14px]"
              >
                <IoCallOutline size={16} />
                <span>CALL OR WHATSAPP 65 8343 3698</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;