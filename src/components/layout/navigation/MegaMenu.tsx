"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MegaMenuTabs, CategoryGrid, FeaturedContent, Typography } from "@/components/ui";
import { useHeaderStore } from "@/store/headerStore";
import { useMegaMenuStore, MenuType, TabType } from "@/store/megaMenuStore";

interface MegaMenuProps {
  type: MenuType;
  isVisible: boolean;
  onClose?: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ type, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>("featured");
  const { headerHeight } = useHeaderStore();
  const { typeCategories, collectionCategories, featuredContent, animations } = useMegaMenuStore();

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`megamenu-${type}`}
          style={{ top: `${headerHeight}px` }}
          className="fixed left-0 right-0 w-full bg-white shadow-lg z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animations.container}
        >
          <div className="container max-w-4xl mx-auto py-6">
            <div className="flex flex-row">
              {/* Left section with image */}
              <div className="w-2/5 relative h-[420px]">
                <div className="h-full relative">
                  <Image
                    src={`/images/header/main/${type}.png`}
                    alt={`${type} featured image`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[var(--primary)] opacity-80 z-0"></div>

                  <div className="absolute bottom-8 left-8 z-10 max-w-[80%]">
                    <Typography
                      as="h3"
                      color="white"
                      align="left"
                      className="font-medium"
                    >
                      Check Out Our Featured {type === "jewellery" ? "Jewellery" : "Gemstones"} For The Best Of Our
                      Collection!
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Right section with tabs */}
              <div className="w-2/3 pl-6">
                {/* Tabs navigation */}
                <MegaMenuTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  type={type}
                />

                {/* Tab content with animations */}
                <AnimatePresence mode="wait">
                  {/* Featured Content */}
                  {activeTab === "featured" && (
                    <motion.div
                      key="featured"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animations.tabContent}
                    >
                      <FeaturedContent content={featuredContent[type]} />
                    </motion.div>
                  )}

                  {/* By Type */}
                  {activeTab === "type" && (
                    <motion.div
                      key="type"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animations.tabContent}
                    >
                      <CategoryGrid items={typeCategories[type]} columns={3} />
                    </motion.div>
                  )}

                  {/* By Collection */}
                  {activeTab === "collection" && (
                    <motion.div
                      key="collection"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animations.tabContent}
                    >
                      <CategoryGrid items={collectionCategories[type]} columns={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;