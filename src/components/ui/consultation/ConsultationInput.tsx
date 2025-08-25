"use client";

import React from "react";
import { Typography } from "@/components/ui";

interface ConsultationInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const ConsultationInput: React.FC<ConsultationInputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  className
}) => {
  return (
    <div className={className}>
      <label className="block">
        <Typography
          as="subheading"
          align="left"
          color="var(--consultationForm)"
          className="mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-[var(--primary)] border-b border-[var(--consultationForm)] pb-2 outline-none focus:border-[var(--consultationForm)] focus:border-b-2 transition-colors"
      />
    </div>
  );
};

export default ConsultationInput;