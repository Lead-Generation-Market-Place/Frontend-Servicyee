// src/components/marketing-hub/HomeServicesMarketingHub.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ReviewMarketingSection from "./ReviewMarketingSection";
import AdsPlannerSection from "./AdsPlannerSection";

const HomeServicesMarketingHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"reviews" | "ads">("reviews");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="rounded-full text-xs py-1 px-3 flex items-center gap-1"
        >
          <Sparkles className="h-4 w-4" /> Beta
        </Badge>
      </header>

      {/* Section Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        <Button
          className="w-full sm:w-auto"
          variant={activeSection === "reviews" ? "default" : "outline"}
          onClick={() => setActiveSection("reviews")}
        >
          Review‑Based Marketing
        </Button>
        <Button
          className="w-full sm:w-auto"
          variant={activeSection === "ads" ? "default" : "outline"}
          onClick={() => setActiveSection("ads")}
        >
          Marketing Center
        </Button>
      </div>

      {/* Active Section */}
      <div className="w-full">
        {activeSection === "reviews" ? <ReviewMarketingSection /> : <AdsPlannerSection />}
      </div>
    </div>
  );
};

export default HomeServicesMarketingHub;
