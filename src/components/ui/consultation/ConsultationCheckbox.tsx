"use client";

import React from "react";

interface ConsultationCheckboxProps {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ConsultationCheckbox: React.FC<ConsultationCheckboxProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  className
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
        />
        <div className={`
          border border-[var(--consultationForm)] rounded-sm h-5 w-5 flex flex-shrink-0
          justify-center items-center mr-2
          ${checked ? 'border-2 border-[var(--consultationForm)] bg-[var(--consultationForm)]' : 'border-[var(--consultationFormBorder)]'}
          hover:border-[var(--consultationForm)] transition-colors duration-200
        `}>
          {checked && (
            <svg className="fill-white w-3 h-3" viewBox="0 0 20 20">
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className="ml-2 text-sm text-[var(--consultationForm)] cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default ConsultationCheckbox;