// src/components/marketing-hub/VerifyBadge.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheckIcon, InfoIcon } from "lucide-react";

const VerifyBadge: React.FC = () => {
  const [service, setService] = useState("Home Cleaning");
  const [yearsExperience, setYearsExperience] = useState(5);

  const serviceOptions = [
    "All Services", "Home Cleaning", "Electrician", "HVAC", "Cleaning", "Landscaping",
    "Painting", "Handyman", "Carpenter", "Appliance Repair"
  ];

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50/70 via-background to-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl flex items-center gap-2">
          <ShieldCheckIcon className="w-6 h-6 text-[#0077B6]" />
          Verified Professional Badge
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get verified and stand out from competitors with a trusted badge on your profile.
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
              <label className="text-sm font-medium">Years of Experience</label>
              <Input 
                type="number" 
                value={yearsExperience} 
                onChange={(e) => setYearsExperience(Number(e.target.value))} 
                placeholder="e.g., 5" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">License Number (Optional)</label>
              <Input placeholder="Enter your professional license number" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Insurance Status</label>
              <Select defaultValue="yes">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Do you have insurance?" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="yes">Yes, I have insurance</SelectItem>
                  <SelectItem value="no">No, I do not have insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-3">Benefits of Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Increased Trust</p>
              <p className="text-xs text-muted-foreground mt-1">
                Customers are 65% more likely to choose verified professionals.
              </p>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-[#0077B6]">Higher Visibility</p>
              <p className="text-xs text-muted-foreground mt-1">
                Verified profiles appear higher in search results.
              </p>
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Save for Later</Button>
          <Button className="bg-[#0077B6] hover:bg-[#016ca6]">Apply for Verification</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyBadge;