// src/components/marketing-hub/Guarantee.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ShieldIcon, InfoIcon } from "lucide-react";

const Guarantee: React.FC = () => {
  const [service, setService] = useState("Home Cleaning");
  const [coverageAmount, setCoverageAmount] = useState(1000);

  const serviceOptions = [
    "All Services", "Home Cleaning", "Electrician", "HVAC", "Cleaning", "Landscaping",
    "Painting", "Handyman", "Carpenter", "Appliance Repair"
  ];

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50/70 via-background to-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl flex items-center gap-2">
          <ShieldIcon className="w-6 h-6 text-[#0077B6]" />
          Satisfaction Guarantee
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Offer a satisfaction guarantee to build trust and win more customers.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
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
              <label className="text-sm font-medium">Guarantee Duration</label>
              <Select defaultValue="30-days">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select guarantee period" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="7-days">7 Days</SelectItem>
                  <SelectItem value="30-days">30 Days</SelectItem>
                  <SelectItem value="90-days">90 Days</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>Coverage Amount</span>
                <span className="text-[#0077B6] font-semibold">${coverageAmount}</span>
              </label>
              <Slider
                value={[coverageAmount]}
                onValueChange={([value]) => setCoverageAmount(value)}
                max={5000}
                step={100}
                className="py-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$100</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guarantee Type</label>
              <Select defaultValue="satisfaction">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select guarantee type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="satisfaction">Satisfaction Guarantee</SelectItem>
                  <SelectItem value="workmanship">Workmanship Guarantee</SelectItem>
                  <SelectItem value="double-back">Double-Back Guarantee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Benefits of Offering a Guarantee</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Competitive Edge</p>
              <p className="text-xs text-muted-foreground mt-1">
                Stand out from 72% of competitors who do not offer guarantees.
              </p>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Higher Conversion</p>
              <p className="text-xs text-muted-foreground mt-1">
                Increase conversion rates by up to 30% with a guarantee.
              </p>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Premium Pricing</p>
              <p className="text-xs text-muted-foreground mt-1">
                Justify higher prices by reducing customer risk.
              </p>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Customer Loyalty</p>
              <p className="text-xs text-muted-foreground mt-1">
                Build long-term relationships with trust and confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Pricing</h3>
          <div className="bg-blue-50/50 p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              The cost for your satisfaction guarantee program is <span className="font-semibold text-[#0077B6]">${Math.round(coverageAmount * 0.05)}/month</span> 
              {" "}(5% of your coverage amount).
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Save for Later</Button>
          <Button className="bg-[#0077B6] hover:bg-[#016ca6]">Activate Guarantee</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Guarantee;