"use client";
import React from 'react';
import { Card } from '@/components/ui';

const Feature = () => {
  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Card
            variant="feature"
            imageUrl="/images/feature/feature1.png"
            imageAlt="Rare gemstone jewelry"
            title="Rare Gems."
            description="Remarkable Stories."
            href="/stories/rare-gems"
            imageAspect="4/3"
          />
        </div>
        <div>
          <Card
            variant="feature"
            imageUrl="/images/feature/feature2.png"
            imageAlt="Jewel Boutique Lives"
            title="Jewel Boutique. Lives"
            description="Beyond Trends."
            href="/stories/beyond-trends"
            imageAspect="4/3"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;