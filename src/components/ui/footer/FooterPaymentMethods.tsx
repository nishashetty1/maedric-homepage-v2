"use client";

import React from "react";
import Image from "next/image";

interface PaymentMethod {
  name: string;
  image: string;
}

interface FooterPaymentMethodsProps {
  payments: PaymentMethod[];
  variant?: "desktop" | "mobile";
}

const FooterPaymentMethods: React.FC<FooterPaymentMethodsProps> = ({
  payments,
  variant = "desktop"
}) => {
  const isMobile = variant === "mobile";
  
  return (
    <div className={`flex flex-wrap justify-center ${isMobile ? 'gap-2 mb-6' : 'gap-3 mb-8'}`}>
      {payments.map((method) => (
        <div
          key={method.name}
          className={`bg-white rounded flex items-center justify-center ${
            isMobile ? 'h-4 w-8' : 'h-6 w-10'
          }`}
        >
          <div className="h-full w-full relative">
            <Image
              src={method.image}
              alt={method.name}
              fill
              sizes={isMobile ? "32px" : "40px"}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterPaymentMethods;