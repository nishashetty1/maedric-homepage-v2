"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { Typography } from '@/components/ui';

const StayConnected = () => {
    const [isMobile, setIsMobile] = useState(false);

    interface ImageWithHoverProps {
        src: string;
        alt: string;
        sizes: string;
    }

    // Check window width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Image sources array
    const imageSources = [
        "/images/stay-connected/sc1.jpg",
        "/images/stay-connected/sc2.jpg",
        "/images/stay-connected/sc3.jpg",
        "/images/stay-connected/sc4.jpg",
        "/images/stay-connected/sc5.png",
        "/images/stay-connected/sc6.png"
    ];

    // Reusable image component with hover effect
    const ImageWithHover: React.FC<ImageWithHoverProps> = ({ src, alt, sizes }) => (
        <Link
            href="https://instagram.com/maedric"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-full w-full overflow-hidden group block cursor-pointer aspect-square"
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Non-hover overlay */}
            <div className="absolute inset-0 bg-[var(--default)]/40 group-hover:opacity-0 transition-opacity duration-300"></div>

            {/* Hover overlay with Instagram icon */}
            <div className="absolute inset-0 bg-[var(--primary)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 flex items-center justify-center">
                <FaInstagram className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-0" />
            </div>

            {/* Box shadow */}
            <div className="absolute inset-0 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] pointer-events-none"></div>
        </Link>
    );

    // Animated Instagram handle component
    const AnimatedInstagramHandle = () => (
        <Link
            href="https://instagram.com/maedric"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block text-[var(--accent)] text-2xl md:text-3xl font-medium transition-opacity"
        >
            <span className="relative inline-block">
                @Maedric
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--accent)] origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </span>
        </Link>
    );

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 md:py-8 md:pb-0">
                <Typography
                    as="h2"
                    color="primary"
                    align="center"
                    className="mb-8 text-2xl md:text-3xl lg:text-4xl"
                >
                    Stay Connected{isMobile ? <br /> : " "}With Maedric
                </Typography>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block max-w-6xl mx-auto mb-36 px-4">
                <div className="grid grid-cols-4 grid-rows-2 h-full">
                    {/* First row */}
                    <div className="bg-[var(--primary)] col-span-2 flex items-center justify-center">
                        <div className="text-center">
                            <Typography as="body-light" color="white" className="mb-3">
                                Follow Us
                            </Typography>
                            <AnimatedInstagramHandle />
                        </div>
                    </div>
                    <div className="">
                        <ImageWithHover
                            src={imageSources[0]}
                            alt="Maedric Gold Chain"
                            sizes="25vw"
                        />
                    </div>
                    <div className="">
                        <ImageWithHover
                            src={imageSources[1]}
                            alt="Maedric Jewellery Model"
                            sizes="25vw"
                        />
                    </div>

                    {/* Second row - 4 images */}
                    <div className="">
                        <ImageWithHover
                            src={imageSources[2]}
                            alt="Maedric Gold Rings"
                            sizes="25vw"
                        />
                    </div>
                    <div className="">
                        <ImageWithHover
                            src={imageSources[3]}
                            alt="Maedric Jewellery Chain Necklace"
                            sizes="25vw"
                        />
                    </div>
                    <div className="">
                        <ImageWithHover
                            src={imageSources[4]}
                            alt="Maedric Jewellery Woman with Earrings"
                            sizes="25vw"
                        />
                    </div>
                    <div className="">
                        <ImageWithHover
                            src={imageSources[5]}
                            alt="Maedric Jewellery Model"
                            sizes="25vw"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden px-4 mb-64">
                <div className="grid grid-cols-2">
                    {/* Top Row */}
                    <div className="aspect-square">
                        <ImageWithHover
                            src={imageSources[0]}
                            alt="Maedric Gold Rings"
                            sizes="50vw"
                        />
                    </div>
                    <div className="aspect-square">
                        <ImageWithHover
                            src={imageSources[1]}
                            alt="Maedric Jewellery Chain Necklace"
                            sizes="50vw"
                        />
                    </div>

                    {/* Bottom Row */}
                    <div className="aspect-square">
                        <ImageWithHover
                            src={imageSources[2]}
                            alt="Maedric Jewellery Woman with Earrings"
                            sizes="50vw"
                        />
                    </div>
                    <div className="aspect-square">
                        <ImageWithHover
                            src={imageSources[3]}
                            alt="Maedric Jewellery Model"
                            sizes="50vw"
                        />
                    </div>
                </div>

                {/* Mobile Follow Us Section */}
                <div className="bg-[var(--primary)] py-12 text-center">
                    <Typography as="body-light" color="white" className="mb-3">
                        Follow Us
                    </Typography>
                    <AnimatedInstagramHandle />
                </div>
            </div>
        </section>
    );
};

export default StayConnected;