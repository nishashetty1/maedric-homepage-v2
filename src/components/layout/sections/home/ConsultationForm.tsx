"use client";

import React from "react";
import Image from "next/image";
import { useConsultationStore, FormType } from "@/store/consultationStore";
import { Typography, Button } from "@/components/ui";
import {
  ConsultationInput,
  ConsultationOptionButtons,
  ConsultationRangeSlider,
  ConsultationSelect,
} from "@/components/ui";

interface ConsultationFormProps {
  type: FormType;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ type }) => {
  const {
    formData,
    rangeValues,
    activeOccasionBtn,
    activeJewelryBtn,
    draggedSlider,
    formText,
    occasionOptions,
    jewelryOptions,
    handleInputChange,
    handleSubmit,
    setRangeValue,
    setActiveOccasionBtn,
    setActiveJewelryBtn,
    setDraggedSlider,
  } = useConsultationStore();

  // Handle range slider changes
  const handleRangeChange = (value: number, handle: string) => {
    const formType = type === "Default" ? "Boutique" : type;
    setRangeValue(formType, handle, value);
  };

  // Image based on type
  const imageSrc =
    type === "Bridal"
      ? "/images/consultation/bridal.jpg"
      : type === "Boutique"
        ? "/images/consultation/boutique.jpg"
        : "/images/consultation/gemstone.jpg";

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
      {/* Form Section - Left on Desktop, Bottom on Mobile */}
      <div className="w-full md:w-1/2 h-[500px] md:h-[650px] overflow-y-auto md:pr-6 order-2 md:order-1 mt-8 md:mt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <ConsultationInput
            label="How would you like to be addressed?"
            name="name"
            type="text"
            placeholder="your name here"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          {/* Contact Fields - For desktop layout */}
          <div className="hidden md:flex md:space-x-4">
            <div className="w-1/2">
              <Typography
                as="subheading"
                align="left"
                color="var(--consultationForm)"
                className="mb-2"
              >
                Phone Number
              </Typography>
              <input
                name="phone"
                type="tel"
                placeholder="Enter Phone"
                className="w-full border-b border-[var(--consultationFormBorder)] py-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <Typography
                as="subheading"
                align="left"
                color="var(--consultationForm)"
                className="mb-2"
              >
                Email Address
              </Typography>
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full border-b border-[var(--consultationFormBorder)] py-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Contact Method - Mobile */}
          <div className="md:hidden">
            <ConsultationSelect
              label="How may we reach out to you?"
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleInputChange}
              options={[
                "Voice Call - Afternoon",
                "Voice Call - Morning",
                "Email",
                "WhatsApp",
              ]}
            />
          </div>

          {/* Timing */}
          <ConsultationSelect
            label={formText.timingQuestion[type]}
            name="timing"
            value={formData.timing}
            onChange={handleInputChange}
            options={["4-6 Months", "2-3 Months", "1 Month", "ASAP"]}
          />

          {/* Budget Range */}
          <div>
            <Typography
              as="subheading"
              align="left"
              color="var(--consultationForm)"
              className="mb-2"
            >
              What budget range are you considering?
            </Typography>
            <ConsultationRangeSlider
              min={
                formText.budgetRange[type === "Default" ? "Boutique" : type].min
              }
              max={
                formText.budgetRange[type === "Default" ? "Boutique" : type].max
              }
              currentMin={
                rangeValues[type === "Default" ? "Boutique" : type].min
              }
              currentMax={
                rangeValues[type === "Default" ? "Boutique" : type].max
              }
              draggedSlider={draggedSlider}
              onRangeChange={handleRangeChange}
              setDraggedSlider={setDraggedSlider}
            />
          </div>

          {/* Occasion */}
          <div>
            <Typography
              as="subheading"
              align="left"
              color="var(--consultationForm)"
              className="mb-2"
            >
              {formText.occasionQuestion[type]}
            </Typography>

            {type === "Bridal" ? (
              <div className="flex flex-wrap gap-3 mt-2">
                {occasionOptions[type].map((option: any) => (
                  <div key={option.value} className="flex items-center">
                    {option.hasInput ? (
                      <div className="flex items-center">
                        <span className="mr-2 text-[var(--consultationForm)]">
                          Other:
                        </span>
                        <input
                          name="occasionCustom"
                          type="text"
                          value={formData.occasionCustom}
                          onChange={handleInputChange}
                          placeholder="Any special celebration?"
                          className="border-b border-[var(--consultationFormBorder)] outline-none w-48"
                        />
                      </div>
                    ) : (
                      <Button
                        variant="consultation"
                        active={activeOccasionBtn === option.value}
                        type="button"
                        onClick={() =>
                          setActiveOccasionBtn(
                            activeOccasionBtn === option.value
                              ? null
                              : option.value
                          )
                        }
                        className="px-6"
                      >
                        {option.label}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : type === "Boutique" ? (
              <ConsultationSelect
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                options={occasionOptions[type].map((opt: any) => opt.label)}
              />
            ) : (
              <ConsultationSelect
                name="gemstoneGroup"
                value={formData.occasion}
                onChange={handleInputChange}
                options={occasionOptions[type].map((opt: any) => opt.label)}
              />
            )}
          </div>

          {/* Jewelry Type */}
          <div>
            <Typography
              as="subheading"
              align="left"
              color="var(--consultationForm)"
              className="mb-2"
            >
              Which type of jewellery do you want to get customised?
            </Typography>

            {type === "Bridal" ? (
              <div className="grid grid-cols-2 gap-4">
                {jewelryOptions[type].map((option: any) => (
                  <Button
                    key={option.value}
                    variant="consultation"
                    active={activeJewelryBtn === option.value}
                    type="button"
                    onClick={() =>
                      setActiveJewelryBtn(
                        activeJewelryBtn === option.value ? null : option.value
                      )
                    }
                    className="w-full text-center"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 mt-2">
                {jewelryOptions[type].map((option: any) => (
                  <Button
                    key={option.value}
                    variant="consultation"
                    active={activeJewelryBtn === option.value}
                    type="button"
                    onClick={() =>
                      setActiveJewelryBtn(
                        activeJewelryBtn === option.value ? null : option.value
                      )
                    }
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Gemstone-specific question */}
          {type === "Gemstone" && (
            <ConsultationSelect
              label="Do you require external certification?"
              name="gemstonesInvolved"
              value={formData.gemstonesInvolved}
              onChange={handleInputChange}
              options={[
                "Yes, Local certification",
                "Yes, International certification",
                "No need",
              ]}
            />
          )}

          {/* Boutique-specific question */}
          {type === "Boutique" && (
            <ConsultationSelect
              label="Are there any gemstones involved?"
              name="gemstonesInvolved"
              value={formData.gemstonesInvolved}
              onChange={handleInputChange}
              options={[
                "Yes, Maedric provides them",
                "No, I have my own",
                "I need guidance",
              ]}
            />
          )}

          {/* Design Process */}
          <ConsultationSelect
            label="How would you like the design process to go?"
            name="designProcess"
            value={formData.designProcess}
            onChange={handleInputChange}
            options={[
              "Maedric takes the lead",
              "I have specific ideas",
              "Collaborative approach",
            ]}
          />

          {/* Details / Story */}
          <div>
            <Typography
              as="subheading"
              align="left"
              color="var(--consultationForm)"
              className="mb-2"
            >
              {formText.textareaQuestion[type]}
            </Typography>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full border border-[var(--consultationFormBorder)] p-4 min-h-[100px] outline-none"
              placeholder="Any additional details like shared stories for us to consider?"
            />
          </div>

          {/* Subscribe */}
          <div className="flex items-center">
            <input
              name="subscribe"
              type="checkbox"
              id="subscribe"
              checked={formData.subscribe}
              onChange={handleInputChange}
              className="h-4 w-4 border-[var(--consultationFormBorder)]"
            />
            <label
              htmlFor="subscribe"
              className="ml-2 text-sm text-[var(--consultationForm)]"
            >
              Subscribe and Be first to know about our latest creations and
              curated gemstones.
            </label>
          </div>

          {/* Submit Button */}
          <Button
            variant="filled"
            fullWidth
            className="bg-[#051E33] border-[#051E33] hover:bg-[#051E33cc] transition-colors"
            type="submit"
          >
            Schedule An Appointment
          </Button>
        </form>
      </div>

      {/* Image Section - Right on Desktop, Top on Mobile */}
      <div className="w-full md:w-1/2 order-1 md:order-2 md:pl-6">
        <div className="relative h-[500px] md:h-[650px] w-full">
          <Image
            src={imageSrc}
            alt={`${type} jewellery consultation`}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
