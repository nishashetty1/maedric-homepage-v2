"use client";

import React from "react";
import { Typography } from "@/components/ui";
import { SlArrowDown } from "react-icons/sl";

interface ConsultationSelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
}

const ConsultationSelect: React.FC<ConsultationSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block">
          <Typography
            as="subheading"
            align="left"
            color="var(--consultationForm)"
          >
            {label}
          </Typography>
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-[var(--consultationForm)] border-b border-[var(--consultationFormBorder)] pb-2 outline-none appearance-none focus:border-[var(--consultationFormHover)] bg-transparent pr-8 transition-colors"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <SlArrowDown width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default ConsultationSelect;