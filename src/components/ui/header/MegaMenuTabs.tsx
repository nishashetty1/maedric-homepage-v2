import React from "react";
import { TabType, MenuType } from "@/store/megaMenuStore";

interface MegaMenuTabsProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    type?: MenuType;
    isMobile?: boolean;
}

const MegaMenuTabs: React.FC<MegaMenuTabsProps> = ({
    activeTab,
    setActiveTab,
    type,
    isMobile = false
}) => {
    if (isMobile) {
        return (
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("featured")}
                    className={`py-3 px-4 text-[13px] font-medium uppercase ${activeTab === "featured"
                            ? "text-[var(--accent)]"
                            : "text-gray-400"
                        }`}
                >
                    Featured
                </button>
                <button
                    onClick={() => setActiveTab("type")}
                    className={`py-3 px-4 text-[13px] font-medium uppercase ${activeTab === "type"
                            ? "text-[var(--primary)]"
                            : "text-gray-400"
                        }`}
                >
                    Types
                </button>
                <button
                    onClick={() => setActiveTab("collection")}
                    className={`py-3 px-4 text-[13px] font-medium uppercase ${activeTab === "collection"
                            ? "text-[var(--primary)]"
                            : "text-gray-400"
                        }`}
                >
                    Collections
                </button>
            </div>
        );
    }

    return (
        <div className="flex border-b border-gray-200 mb-5">
            <button
                onClick={() => setActiveTab("featured")}
                className={`py-2 px-5 font-medium text-sm cursor-pointer flex items-center gap-1 ${activeTab === "featured"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                        : "text-[var(--primary)]"
                    }`}
            >
                {type === "jewellery" ? "FEATURED JEWELLERY" : "FEATURED GEMSTONES"}
            </button>
            <button
                onClick={() => setActiveTab("type")}
                className={`py-2 px-5 font-medium text-sm cursor-pointer flex items-center gap-1 ${activeTab === "type"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                        : "text-[var(--primary)]"
                    }`}
            >
                {type === "jewellery" ? "BY JEWELLERY TYPE" : "BY GEMSTONE TYPE"}
            </button>
            <button
                onClick={() => setActiveTab("collection")}
                className={`py-2 px-5 font-medium text-sm cursor-pointer flex items-center gap-1 ${activeTab === "collection"
                        ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
                        : "text-[var(--primary)]"
                    }`}
            >
                BY COLLECTION
            </button>
        </div>
    );
};

export default MegaMenuTabs;