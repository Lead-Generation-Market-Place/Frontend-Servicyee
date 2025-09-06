// src/components/marketing-hub/CampaignForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CampaignFormProps {
  goalType: "awareness" | "conversion" | "engagement";
}

const CampaignForm: React.FC<CampaignFormProps> = () => {
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

  // Example estimated results (static for now)
  const estimatedLeads = 14;
  const estimatedCostPerLead = 125;
  const estimatedROI = 70;

  const serviceOptions = [
    "All Services","Home Cleaning", "Electrician", "HVAC", "Cleaning", "Landscaping",
    "Painting", "Handyman", "Carpenter", "Appliance Repair"
  ];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 pt-4">
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
              <span>Monthly Budget (Credits)</span>
              <span className="text-[#0077B6] font-semibold">{budget} credits</span>
            </label>
            <Slider
              value={[budget]}
              onValueChange={([value]) => setBudget(value)}
              max={20000}
              step={500}
              className="py-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>500 credits</span>
              <span>10,000 credits</span>
              <span>20,000 credits</span>
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

      {/* Results Preview */}
      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-3">Estimated Results</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50/50 p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Estimated Leads</p>
            <p className="text-2xl font-bold text-[#0077B6]">{estimatedLeads.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Avg. Cost Per Lead</p>
            <p className="text-2xl font-bold text-[#0077B6]">{estimatedCostPerLead} credits</p>
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
        <Button className="bg-[#0077B6] hover:bg-[#016ca6]">Launch Campaign</Button>
      </div>
    </>
  );
};

export default CampaignForm;