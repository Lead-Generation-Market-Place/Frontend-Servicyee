// src/components/marketing-hub/AdsPlannerSection.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, InfoIcon, TrendingUpIcon, TargetIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AdsPlannerSection: React.FC = () => {
  // Campaign goals
  const [goal, setGoal] = useState<"awareness" | "conversion" | "engagement">("conversion");

  // Service details
  const [service, setService] = useState("Home Cleaning");
  const [city, setCity] = useState("New York");

  // Budget and timeline
  const [budget, setBudget] = useState(12);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  // Marketing parameters
  const [audienceSize, setAudienceSize] = useState<number>(50000);
  const [conversionRate, setConversionRate] = useState<number>(3.5);

  // Advanced options
  const [remarketing, setRemarketing] = useState(true);
  const [competitiveTargeting, setCompetitiveTargeting] = useState(false);
  const [seasonalAdjustment, setSeasonalAdjustment] = useState(true);

  // Calculate estimated results
  const estimatedLeads = 14;
  const estimatedCostPerLead = 125;
  const estimatedROI = 70;

  const serviceOptions = [
    "All Services","Home Cleaning", "Electrician", "HVAC", "Cleaning", "Landscaping",
    "Painting", "Handyman", "Carpenter", "Appliance Repair"
  ];

  const goalOptions = [
    { value: "awareness", label: "Brand Awareness", icon: <UsersIcon className="w-4 h-4" /> },
    { value: "conversion", label: "Lead Conversion", icon: <TargetIcon className="w-4 h-4" /> },
    { value: "engagement", label: "Customer Engagement", icon: <TrendingUpIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50/70 via-background to-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TargetIcon className="w-6 h-6 text-[#0077B6]" />
            Marketing Campaign Planner
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Plan and optimize your marketing campaigns with professional tools and metrics.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campaign Goal */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              Campaign Goal
              <Badge variant="outline" className="font-normal">Primary</Badge>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {goalOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    goal === option.value
                      ? "border-[#0077B6]] bg-blue-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setGoal(option.value as any)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "p-2 rounded-full",
                      goal === option.value ? "bg-blue-100 text-[#0077B6]" : "bg-gray-100 text-gray-600"
                    )}>
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {option.value === "awareness" && "Increase brand visibility and recognition"}
                    {option.value === "conversion" && "Generate qualified leads and conversions"}
                    {option.value === "engagement" && "Engage existing customers and drive retention"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  Service Type
                  <InfoIcon className="w-3 h-3 text-muted-foreground" />
                </label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {serviceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Location</label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., New York" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Dates</label>
                <div className="grid grid-cols-2 gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Right Column - Budget & Metrics */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Monthly Budget (USD)</span>
                  <span className="text-[#0077B6] font-semibold">${budget.toLocaleString()}</span>
                </label>
                <Slider
                  value={[budget]}
                  onValueChange={([value]) => setBudget(value)}
                  max={20000}
                  step={500}
                  className="py-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$500</span>
                  <span>$10,000</span>
                  <span>$20,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Target Audience Size</span>
                  <span className="text-[#0077B6] font-semibold">{audienceSize.toLocaleString()}</span>
                </label>
                <Slider
                  value={[audienceSize]}
                  onValueChange={([value]) => setAudienceSize(value)}
                  max={200000}
                  step={5000}
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Expected Conversion Rate</span>
                  <span className="text-[#0077B6] font-semibold">{conversionRate}%</span>
                </label>
                <Slider
                  value={[conversionRate]}
                  onValueChange={([value]) => setConversionRate(value)}
                  max={10}
                  step={0.1}
                  className="py-3"
                />
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="remarketing" checked={remarketing} onCheckedChange={setRemarketing} />
                <label htmlFor="remarketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remarketing Campaign
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="competitiveTargeting" checked={competitiveTargeting} onCheckedChange={setCompetitiveTargeting} />
                <label htmlFor="competitiveTargeting" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Competitive Targeting
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="seasonalAdjustment" checked={seasonalAdjustment} onCheckedChange={setSeasonalAdjustment} />
                <label htmlFor="seasonalAdjustment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Seasonal Adjustment
                </label>
              </div>
            </div>
          </div>

          {/* Results Preview */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">Estimated Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50/50 p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Estimated Leads</p>
                <p className="text-2xl font-bold text-[#0077B6]">{estimatedLeads.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Cost Per Lead</p>
                <p className="text-2xl font-bold text-[#0077B6]">${estimatedCostPerLead}</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Estimated ROI</p>
                <p className="text-2xl font-bold text-[#0077B6]">{estimatedROI.toFixed(1)}%</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">Campaign Duration</p>
                <p className="text-2xl font-bold text-[#0077B6]">
                  {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-[#0077B6] hover:bg-[#016ca6]">Generate Campaign Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdsPlannerSection;