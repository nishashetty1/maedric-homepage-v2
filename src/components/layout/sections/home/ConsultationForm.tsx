"use client";

import React from "react";
import Image from "next/image";
import {
  useConsultationStore,
  FormType,
  RING_SIZE_DATA,
} from "@/store/consultationStore";
import { Typography, Button } from "@/components/ui";
import {
  ConsultationInput,
  ConsultationSelect,
  ConsultationRadio,
  ConsultationCheckbox,
} from "@/components/ui";

interface ConsultationFormProps {
  type: FormType;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ type }) => {
  const {
    formData,
    activeOccasionBtn,
    activeJewelryBtn,
    activeJewelryTypes,
    formText,
    occasionOptions,
    jewelryOptions,
    deadlineOptions,
    designProcessOptions,
    helpTypeOptions,
    gemstoneGroupOptions,
    certificationOptions,
    budgetOptions,
    handleInputChange,
    handleSubmit,
    setActiveOccasionBtn,
    setActiveJewelryBtn,
    toggleJewelryType,
    ringStandard,
    setRingStandard,
    getRingSizeWithMm,
  } = useConsultationStore();

  // Handle checkbox change for jewelry types
  const handleJewelryTypeChange = (jewelryType: string) => {
    toggleJewelryType(jewelryType);
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
          {/* Common Fields */}
          {/* Name Field */}
          <ConsultationInput
            label="How may we address you?"
            name="name"
            type="text"
            placeholder="Your name here"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          {/* Contact Fields - For desktop layout */}
          <div>
            <Typography
              as="subheading"
              align="left"
              color="var(--consultationForm)"
              className="mb-2"
            >
              How may we reach out to you?
            </Typography>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
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
                  value={formData.phone || ""}
                  className="w-full text-[var(--primary)] border-b border-[var(--consultationForm)] pb-2 outline-none focus:border-[var(--consultationForm)] focus:border-b-2 transition-colors"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2">
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
                  value={formData.email || ""}
                  className="w-full text-[var(--primary)] border-b border-[var(--consultationForm)] pb-2 outline-none focus:border-[var(--consultationForm)] focus:border-b-2 transition-colors"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <ConsultationSelect
                label="Preferred communication method?"
                name="contactMethod"
                value={formData.contactMethod || ""}
                onChange={handleInputChange}
                options={[
                  "Please Whatsapp me",
                  "Please Call me",
                  "Please Email me",
                ]}
              />
            </div>
          </div>

          {/* Deadline */}
          <ConsultationSelect
            label={formText.deadlineQuestion[type]}
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleInputChange}
            options={deadlineOptions}
          />

          {/* Form-specific Fields */}
          {/* Bridal Form Fields */}
          {type === "Bridal" && (
            <>
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

                <div className="flex flex-wrap gap-3 mt-2">
                  {occasionOptions[type].map((option: any) => (
                    <div key={option.value} className="flex items-center">
                      {option.hasInput ? (
                        <div className="flex items-center">
                          <span className="mr-2 text-[var(--consultationForm)]">
                            {option.label}:
                          </span>
                          <input
                            name="occasionCustom"
                            type="text"
                            value={formData.occasionCustom || ""}
                            onChange={handleInputChange}
                            placeholder="Tell us more"
                            className="border-b border-[var(--consultationForm)] focus:border-b-2 pb-2 outline-none w-48"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jewelryOptions[type].map((option: any) => (
                    <Button
                      key={option.value}
                      variant="consultation"
                      active={activeJewelryBtn === option.value}
                      type="button"
                      onClick={() =>
                        setActiveJewelryBtn(
                          activeJewelryBtn === option.value
                            ? null
                            : option.value
                        )
                      }
                      className="w-full text-center"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Ring Size */}
              <div className="space-y-3">
                <Typography
                  as="subheading"
                  align="left"
                  color="var(--consultationForm)"
                  className="mb-2"
                >
                  What's the ring size?
                </Typography>

                <div className="flex flex-col space-y-3">
                  <ConsultationRadio
                    id="ring-size-known"
                    name="ringSizeKnown"
                    label="I know the ring size"
                    value={true}
                    checked={formData.ringSizeKnown}
                    onChange={() => {
                      const syntheticEvent = {
                        target: {
                          name: "ringSizeKnown",
                          value: true,
                          type: "checkbox",
                          checked: true,
                        },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;

                      handleInputChange(syntheticEvent);
                    }}
                  />

                  {formData.ringSizeKnown && (
                    <div className="space-y-3 ml-6">
                      {/* Standard selector */}
                      <ConsultationSelect
                        label="Select Ring Type?"
                        name="ringStandard"
                        value=""
                        onChange={() => {}} // Not used for this variant
                        options={RING_SIZE_DATA.standards}
                        variant="ringStandard"
                        onStandardChange={setRingStandard}
                        currentStandard={ringStandard}
                      />

                      {/* Size selector */}
                      <ConsultationSelect
                        label="Select Ring Size?"
                        name="ringSize"
                        value={formData.ringSize || ""}
                        onChange={handleInputChange}
                        options={
                          RING_SIZE_DATA.sizes[
                            ringStandard as keyof typeof RING_SIZE_DATA.sizes
                          ] || []
                        }
                        variant="ringSize"
                        formatOption={getRingSizeWithMm}
                      />
                    </div>
                  )}

                  <ConsultationRadio
                    id="ring-size-unknown"
                    name="ringSizeKnown"
                    label="I don't know/it's a surprise"
                    value={false}
                    checked={!formData.ringSizeKnown}
                    onChange={() => {
                      const syntheticEvent = {
                        target: {
                          name: "ringSizeKnown",
                          value: false,
                          type: "checkbox",
                          checked: false,
                        },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;

                      handleInputChange(syntheticEvent);
                    }}
                  />
                </div>
              </div>

              {/* Design Process */}
              <ConsultationSelect
                label="How would you like the design process to go?"
                name="designProcess"
                value={formData.designProcess || ""}
                onChange={handleInputChange}
                options={designProcessOptions}
              />

              {/* Ring Box */}
              <div>
                <Typography
                  as="subheading"
                  align="left"
                  color="var(--consultationForm)"
                  className="mb-2"
                >
                  Do you need a ring box?
                </Typography>

                <div className="flex flex-wrap gap-3 mt-2">
                  <Button
                    variant="consultation"
                    active={formData.ringBox === "Yes please"}
                    type="button"
                    onClick={() => {
                      const syntheticEvent = {
                        target: {
                          name: "ringBox",
                          value: "Yes please",
                        },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;

                      handleInputChange(syntheticEvent);
                    }}
                    className="px-6"
                  >
                    Yes please
                  </Button>

                  <Button
                    variant="consultation"
                    active={formData.ringBox === "No thanks"}
                    type="button"
                    onClick={() => {
                      const syntheticEvent = {
                        target: {
                          name: "ringBox",
                          value: "No thanks",
                        },
                      } as unknown as React.ChangeEvent<HTMLInputElement>;

                      handleInputChange(syntheticEvent);
                    }}
                    className="px-6"
                  >
                    No thanks
                  </Button>
                </div>
              </div>

              {/* Budget */}
              <ConsultationSelect
                label="What is your expected budget?"
                name="budget"
                value={formData.budget || ""}
                onChange={handleInputChange}
                options={budgetOptions[type]}
              />
            </>
          )}

          {/* Boutique Form Fields */}
          {type === "Boutique" && (
            <>
              {/* Event Type */}
              <ConsultationSelect
                label="What's the occasion?"
                name="eventType"
                value={formData.eventType || ""}
                onChange={handleInputChange}
                options={occasionOptions[type].map((opt: any) => opt.label)}
              />

              {formData.eventType === "It's something else" && (
                <div className="ml-6">
                  <ConsultationInput
                    label="Please specify"
                    name="eventTypeCustom"
                    type="text"
                    placeholder="Tell us about the occasion"
                    value={formData.eventTypeCustom || ""}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* Jewelry Types */}
              <div>
                <Typography
                  as="subheading"
                  align="left"
                  color="var(--consultationForm)"
                  className="mb-2"
                >
                  What are you looking for? (Select all that apply)
                </Typography>

                <div className="flex flex-wrap gap-3 mt-2">
                  {jewelryOptions[type].map((option: any) => (
                    <Button
                      key={option.value}
                      variant="consultation"
                      active={activeJewelryTypes.includes(option.value)}
                      type="button"
                      onClick={() => handleJewelryTypeChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Gemstones Involved */}
              <ConsultationSelect
                label="Are there any gemstones involved?"
                name="gemstonesInvolved"
                value={formData.gemstonesInvolved || ""}
                onChange={handleInputChange}
                options={[
                  "Yes, I'll provide them",
                  "Yes, Maedric provides them",
                  "Yes, a mix of both",
                  "No, metal only",
                ]}
              />

              {/* Design Process */}
              <ConsultationSelect
                label="How would you like the design process to go?"
                name="designProcess"
                value={formData.designProcess || ""}
                onChange={handleInputChange}
                options={designProcessOptions}
              />

              {/* Budget */}
              <ConsultationSelect
                label="What is your expected budget?"
                name="budget"
                value={formData.budget || ""}
                onChange={handleInputChange}
                options={budgetOptions[type]}
              />
            </>
          )}

          {/* Gemstone Form Fields */}
          {type === "Gemstone" && (
            <>
              {/* Help Type */}
              <div>
                <Typography
                  as="subheading"
                  align="left"
                  color="var(--consultationForm)"
                  className="mb-2"
                >
                  How can we help you?
                </Typography>

                <div className="flex flex-col space-y-2">
                  {helpTypeOptions.map((option) => (
                    <ConsultationRadio
                      key={option.value}
                      id={`help-${option.value}`}
                      name="helpType"
                      label={option.label}
                      value={option.value}
                      checked={formData.helpType === option.value}
                      onChange={(e) => {
                        const syntheticEvent = {
                          target: {
                            name: "helpType",
                            value: e.target.value,
                          },
                        } as unknown as React.ChangeEvent<HTMLInputElement>;

                        handleInputChange(syntheticEvent);
                      }}
                    />
                  ))}
                </div>

                {formData.helpType === "other" && (
                  <div className="mt-3 ml-6">
                    <ConsultationInput
                      label="Please specify"
                      name="helpTypeCustom"
                      type="text"
                      placeholder="Tell us how we can help"
                      value={formData.helpTypeCustom || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>

              {/* Gemstone Group */}
              <div>
                <Typography
                  as="subheading"
                  align="left"
                  color="var(--consultationForm)"
                  className="mb-2"
                >
                  What group of gemstones are you interested in?
                </Typography>

                <div className="flex flex-col space-y-2">
                  {gemstoneGroupOptions.map((option) => (
                    <ConsultationRadio
                      key={option.value}
                      id={`gemstone-${option.value}`}
                      name="gemstoneGroup"
                      label={option.label}
                      value={option.value}
                      checked={formData.gemstoneGroup === option.value}
                      onChange={(e) => {
                        const syntheticEvent = {
                          target: {
                            name: "gemstoneGroup",
                            value: e.target.value,
                          },
                        } as unknown as React.ChangeEvent<HTMLInputElement>;

                        handleInputChange(syntheticEvent);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Certification */}
              <ConsultationSelect
                label="Do you require external certification?"
                name="certification"
                value={formData.certification || ""}
                onChange={handleInputChange}
                options={certificationOptions}
              />

              {/* Sourcing Budget */}
              <ConsultationSelect
                label="What is your sourcing budget?"
                name="sourcingBudget"
                value={formData.sourcingBudget || ""}
                onChange={handleInputChange}
                options={budgetOptions[type]}
              />
            </>
          )}

          {/* Details / Story - Common for all forms */}
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
              value={formData.details || ""}
              onChange={handleInputChange}
              className="w-full border border-[var(--consultationFormBorder)] p-4 min-h-[100px] outline-none"
              placeholder={formText.textareaPlaceholder[type]}
            />
          </div>

          {/* Subscribe */}
          <ConsultationCheckbox
            id="subscribe"
            name="subscribe"
            label="Subscribe and Be first to know about our latest creations and curated gemstones."
            checked={formData.subscribe || false}
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <Button
            variant="filled"
            fullWidth
            className="hover:bg-[var(--consultationForm)] hover:border-none transition-all duration-500 ease-in-out"
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
