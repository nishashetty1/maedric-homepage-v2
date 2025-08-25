"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Typography } from "@/components/ui";
import { RING_SIZE_DATA } from "@/store/consultationStore";

// Add new variants to the component
type SelectVariant = 'standard' | 'ringStandard' | 'ringSize';

interface ConsultationSelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  variant?: SelectVariant;
  onStandardChange?: (standard: string) => void;
  currentStandard?: string;
  formatOption?: (option: string) => string;
}

const ConsultationSelect: React.FC<ConsultationSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  variant = 'standard',
  onStandardChange,
  currentStandard,
  formatOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleOptionClick = (option: string) => {
    // For ring standard, call the standard change handler
    if (variant === 'ringStandard' && onStandardChange) {
      onStandardChange(option);
    }
    else {
      // Create a synthetic event to mimic select onChange
      const syntheticEvent = {
        target: {
          name,
          value: option,
        }
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      
      onChange(syntheticEvent);
    }
    
    setIsOpen(false);
  };

  // Format display value based on variant
  const getDisplayValue = () => {
    if (!value && variant !== 'ringStandard') return "Select";
    
    if (variant === 'ringStandard') {
      return currentStandard || "US";
    }
    
    if (variant === 'ringSize' && formatOption) {
      return formatOption(value);
    }
    
    return value;
  };

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <Typography
          as="subheading"
          align="left"
          color="var(--consultationForm)"
          className="mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}

      {/* Hidden actual select for form submission */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="sr-only"
        required={required}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom select button */}
      <div
        className="w-full text-[var(--primary)] border-b border-[var(--consultationForm)] pb-2 flex justify-between items-center cursor-pointer outline-none focus:border-[var(--consultationForm)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-[var(--consultationForm)] ${!value && variant !== 'ringStandard' ? 'opacity-60' : ''}`}>
          {getDisplayValue()}
        </span>
        <FiChevronDown 
          className={`text-[var(--consultationForm)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--consultationFormBorder)] shadow-md max-h-60 overflow-y-auto">
          {variant === 'ringSize' && formatOption ? (
            // For ring size dropdown with mm values
            options.map((option) => (
              <div
                key={option}
                className={`p-3 cursor-pointer transition-colors duration-500 ease-in-out hover:bg-[var(--consultationForm)] hover:text-white  ${
                  value === option ? "font-medium transition-colors duration-500 ease-in-out bg-[var(--consultationForm)] text-white" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {formatOption(option)}
              </div>
            ))
          ) : (
            // Standard dropdown
            options.map((option) => (
              <div
                key={option}
                className={`p-2 transition-colors duration-500 ease-in-out cursor-pointer  hover:bg-[var(--consultationForm)] hover:text-white ${
                  (variant === 'ringStandard' ? currentStandard === option : value === option) ? "font-medium transition-colors duration-500 ease-in-out bg-[var(--consultationForm)] text-white" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultationSelect;