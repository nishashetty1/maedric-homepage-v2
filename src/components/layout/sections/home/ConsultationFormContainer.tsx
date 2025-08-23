"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useConsultationStore, FormType } from "@/store/consultationStore";
import { ConsultationForm } from "@/components/layout";
import { Typography } from "@/components/ui";
import TabButtons from "@/components/ui/consultation/TabButtons";

const ConsultationFormContainer: React.FC = () => {
  const { activeFormType, formText, setActiveFormType } =
    useConsultationStore();

  // Reset to default view if coming from another page
  useEffect(() => {
    return () => {
      setActiveFormType("Default");
    };
  }, [setActiveFormType]);

  // Default header when no form is selected
  const renderDefaultHeader = () => {
    return (
      <div className="w-full mb-8">
        <div className="max-w-3xl mx-auto text-center px-4">
          <Typography as="h2" align="center" color="primary" className="!mb-2 text-2xl md:text-3xl">
            {formText.title["Default"]}
          </Typography>

          <Typography as="body-light" align="center" color="var(--consultationForm)" className="!text-md">
            {formText.subtitle["Default"]}
          </Typography>
        </div>
      </div>
    );
  };

  // Create tabs for the TabButtons component
  const getTabs = () => {
    const formTypes: FormType[] = ["Bridal", "Boutique", "Gemstone"];
    return formTypes.map(type => ({
      id: type,
      label: type.toUpperCase()
    }));
  };

  const Paragraph: React.FC<{
    children: React.ReactNode;
    wide?: boolean;
    noPx?: boolean
  }> = ({
    children,
    wide = false,
    noPx = false,
  }) => (
      <Typography
        as="body-light"
        color="var(--consultationForm)"
        className={`mb-8 text-left !text-base ${wide ? "max-w-5xl" : "max-w-3xl"} ${noPx ? "" : "px-4"}`}
      >
        {children}
      </Typography>
    );

  // Default content when no form type is selected
  const renderDefaultContent = () => {
    return (
      <div className="w-full flex flex-col md:flex-row max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 hidden md:flex flex-col mb-8 md:mb-0 md:pr-8">
          <Typography
            as="h3"
            color="var(--consultationForm)"
            className="mb-4 font-medium px-4"
            align="left"
          >
            Hi There, Isaiah Here.
          </Typography>

          <Typography
            as="h3"
            color="var(--consultationForm)"
            className="mb-8 font-medium px-4"
            align="left"
          >
            I'm The Artisan Behind Your Story
          </Typography>

          <Paragraph wide>
            I am the founder and the principal designer of Maedric, working
            closely with you from initial sketch to final polish to provide a
            refreshing perspective on quality, provenance, and pricing.
          </Paragraph>
          <Paragraph>
            I got into jewellery from the prospect of crafting personal
            belongings that represented me and my journey.
          </Paragraph>
          <Paragraph>
            The idea of owning a story set in rock and stone appealed to my
            senses, even if it was just a pendant resembling a baguette.
          </Paragraph>
          <Paragraph>
            For the past five years, following my graduation with a Diploma in Fine Jewellery Design from JDMIS, I established Maedric to expand the jewellery landscape of Singapore beyond gold and diamonds, and to set the standard for the coloured gemstone industry.
          </Paragraph>
          <Paragraph >
            Keen to see what we can accomplish together?
          </Paragraph>
          <Paragraph>
            Feel free to drop me a message or have a look at our latest creations. We would love to learn more about you.
          </Paragraph>
        </div>

        <div className="relative w-full md:w-1/2 aspect-square">
          <Image
            src="/images/consultation/default.jpg"
            alt="Maedric Jewellery Consultation"
            fill
            className="object-cover aspect-square"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white border-t border-b border-[var(--border)]">
      <div className="container mx-auto px-4">
        {/* Show the default header if no specific form is selected */}
        {activeFormType === "Default" && renderDefaultHeader()}

        {/* Show the title for the specific form type */}
        {activeFormType !== "Default" && (
          <div className="max-w-3xl mx-auto text-center mb-8">
            <Typography as="h2" align="center" color="primary" className="!mb-2 text-2xl md:text-3xl">
              {formText.title[activeFormType]}
            </Typography>
          </div>
        )}

        {/* Tab buttons now positioned below subtitle */}
        <div className="flex justify-center mb-8">
          <TabButtons
            tabs={getTabs()}
            activeTabId={activeFormType === "Default" ? "" : activeFormType}
            onTabChange={(tabId) =>
              setActiveFormType(activeFormType === tabId ? "Default" : tabId as FormType)
            }
            className="max-w-3xl mx-auto"
          />
        </div>

        {/* Show either the default content or the appropriate form */}
        {activeFormType === "Default" ? (
          renderDefaultContent()
        ) : (
          <ConsultationForm type={activeFormType} />
        )}
      </div>
    </section>
  );
};

export default ConsultationFormContainer;