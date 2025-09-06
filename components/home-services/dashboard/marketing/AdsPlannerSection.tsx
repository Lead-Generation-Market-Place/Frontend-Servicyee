// src/components/marketing-hub/AdsPlannerSection.tsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileVisibility from "./ProfileVisibility";
import GetMoreLeads from "./GetMoreLeads";
import CustomerRetention from "./CustomerRetention";
import VerifyBadge from "./VerifyBadge";
import Guarantee from "./Guaranty";

const AdsPlannerSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="leads">Get More Leads</TabsTrigger>
          <TabsTrigger value="visibility">Profile Visibility</TabsTrigger>
          <TabsTrigger value="retention">Customer Retention</TabsTrigger>
          <TabsTrigger value="verify">Verify Badge</TabsTrigger>
          <TabsTrigger value="guarantee">Guarantee</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <GetMoreLeads />
        </TabsContent>
        
        <TabsContent value="visibility">
          <ProfileVisibility />
        </TabsContent>
        
        <TabsContent value="retention">
          <CustomerRetention />
        </TabsContent>
        
        <TabsContent value="verify">
          <VerifyBadge />
        </TabsContent>
        
        <TabsContent value="guarantee">
          <Guarantee />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdsPlannerSection;