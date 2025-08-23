"use client";

import React from "react";
import { Button } from "@/components/ui";
import { twMerge } from "tailwind-merge";

interface Option {
  label: string;
  value: string;
}

interface ConsultationOptionButtonsProps {
  options: Option[];
  activeOption: string | null;
  setActiveOption: (id: string | null) => void;
  className?: string;
  buttonClassName?: string;
}

const ConsultationOptionButtons: React.FC<ConsultationOptionButtonsProps> = ({
  options,
  activeOption,
  setActiveOption,
  className,
  buttonClassName
}) => {
  return (
    <div className={twMerge("flex flex-wrap gap-3 mt-2", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant="consultation"
          type="button"
          active={activeOption === option.value}
          onClick={() => setActiveOption(activeOption === option.value ? null : option.value)}
          className={buttonClassName}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ConsultationOptionButtons;