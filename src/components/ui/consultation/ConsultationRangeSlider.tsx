"use client";

import React from "react";

interface ConsultationRangeSliderProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  draggedSlider: string | null;
  onRangeChange: (value: number, handle: string) => void;
  setDraggedSlider: (slider: string | null) => void;
}

const ConsultationRangeSlider: React.FC<ConsultationRangeSliderProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  draggedSlider,
  onRangeChange,
  setDraggedSlider
}) => {
  const handleSliderInteraction = (
    e: React.MouseEvent | React.TouchEvent,
    handle: string
  ) => {
    e.preventDefault();
    setDraggedSlider(handle);

    const sliderTrack = document.querySelector(".slider-track");
    if (!sliderTrack) return;

    const trackRect = sliderTrack.getBoundingClientRect();
    const rangeSize = max - min;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = Math.max(0, Math.min(moveEvent.clientX - trackRect.left, trackRect.width));
      const percentage = x / trackRect.width;
      const newValue = Math.round(min + percentage * rangeSize);
      
      if (handle === "min") {
        // Make sure min doesn't exceed max - 1
        const cappedValue = Math.min(newValue, currentMax - 1);
        onRangeChange(cappedValue, handle);
      } else {
        // Make sure max doesn't go below min + 1
        const cappedValue = Math.max(newValue, currentMin + 1);
        onRangeChange(cappedValue, handle);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setDraggedSlider(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max(0, x / rect.width), 1);
    const value = Math.round(min + (max - min) * percent);

    // Determine which handle to move (closest)
    const minDistance = Math.abs(value - currentMin);
    const maxDistance = Math.abs(value - currentMax);

    if (minDistance <= maxDistance) {
      onRangeChange(Math.min(value, currentMax - 1), "min");
    } else {
      onRangeChange(Math.max(value, currentMin + 1), "max");
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="relative h-12 w-full flex items-center">
        {/* Min Value Button */}
        <span className="inline-block z-20 mr-3 px-2 py-1 text-sm border border-[var(--consultationFormBorder)] bg-transparent text-[var(--consultationForm)]">
          ${currentMin}k
        </span>

        {/* Slider Container */}
        <div className="relative flex-1 h-8">
          {/* Track */}
          <div className="absolute rounded-full h-[8px] bg-[var(--consultationFormHover)] left-0 right-0 top-1/2 -translate-y-1/2"></div>

          {/* Selected Range */}
          <div
            className="absolute h-[8px] bg-[var(--consultationForm)] top-1/2 -translate-y-1/2"
            style={{
              left: `${((currentMin - min) / (max - min)) * 100}%`,
              right: `${100 - ((currentMax - min) / (max - min)) * 100}%`,
            }}
          ></div>

          {/* Min Handle */}
          <div
            className={`absolute w-[16px] h-[16px] rounded-full bg-[var(--consultationForm)] top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10 ${
              draggedSlider === "min"
                ? "ring-2 ring-offset-2 ring-[var(--consultationFormHover)]"
                : ""
            }`}
            style={{
              left: `${((currentMin - min) / (max - min)) * 100}%`,
            }}
            onMouseDown={(e) => handleSliderInteraction(e, "min")}
          ></div>

          {/* Max Handle */}
          <div
            className={`absolute w-[16px] h-[16px] rounded-full bg-[var(--consultationForm)] top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10 ${
              draggedSlider === "max"
                ? "ring-2 ring-offset-2 ring-[var(--consultationFormHover)]"
                : ""
            }`}
            style={{
              left: `${((currentMax - min) / (max - min)) * 100}%`,
            }}
            onMouseDown={(e) => handleSliderInteraction(e, "max")}
          ></div>

          {/* Clickable Area for better UX */}
          <div
            className="absolute h-full w-full left-0 top-0 cursor-pointer slider-track"
            onClick={handleTrackClick}
          ></div>
        </div>

        {/* Max Value Button */}
        <span className="inline-block z-20 ml-3 px-2 py-1 text-sm border border-[var(--consultationFormBorder)] bg-transparent text-[var(--consultationForm)]">
          ${currentMax}k
        </span>
      </div>
    </div>
  );
};

export default ConsultationRangeSlider;