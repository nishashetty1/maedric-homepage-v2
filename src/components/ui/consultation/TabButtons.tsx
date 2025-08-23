"use client";

import React from "react";
import { Button } from "@/components/ui"
import { twMerge } from "tailwind-merge";

type Tab = {
  id: string;
  label: string;
};

interface TabButtonsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  tabs = [],
  activeTabId,
  onTabChange,
  className = "",
}) => (
  <div
    className={twMerge(
      "flex flex-col md:flex-row justify-center items-center w-5xl gap-3 md:gap-2 mx-8",
      className
    )}
    role="tablist"
  >
    {tabs.map((tab) => (
      <Button
        key={tab.id}
        variant="tab"
        active={activeTabId === tab.id}
        onClick={() => onTabChange(tab.id)}
        aria-pressed={activeTabId === tab.id}
        role="tab"
        aria-controls={`panel-${tab.id}`}
      >
        {tab.label}
      </Button>
    ))}
  </div>
);

export default TabButtons;