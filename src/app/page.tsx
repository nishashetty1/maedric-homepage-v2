"use client";
import { Hero, CollectionSlider, CategorySlider, ProductSlider, Feature, Banner, Process, Testimonials, ConsultationFormContainer, StayConnected } from "@/components/layout";


export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <CategorySlider />
      <CollectionSlider />
      <Feature />
      <ProductSlider />
      <Banner />
      <Process />
      <Testimonials />
      <ConsultationFormContainer />
      <StayConnected />
    </main>
  );
}
