"use client";

import React from "react";
import { Typography } from "@/components/ui";

interface ConsultationRadioProps {
  label: string;
  id: string;
  name: string;
  value: string | boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ConsultationRadio: React.FC<ConsultationRadioProps> = ({
  label,
  id,
  name,
  value,
  checked,
  onChange,
  className
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          id={id}
          type="radio"
          name={name}
          value={typeof value === 'string' ? value : ''}
          checked={checked}
          onChange={onChange}
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
        />
        <div className={`
          border border-[var(--consultationForm)] rounded-full h-5 w-5 flex flex-shrink-0
          justify-center items-center mr-2 
          ${checked ? 'border-2 border-[var(--consultationForm)]' : 'border-[var(--consultationFormBorder)]'}
          hover:border-[var(--consultationForm)] transition-colors duration-200
        `}>
          {checked && (
            <div className="rounded-full bg-[var(--consultationForm)] h-2.5 w-2.5" />
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className="text-[var(--consultationForm)] cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default ConsultationRadio;