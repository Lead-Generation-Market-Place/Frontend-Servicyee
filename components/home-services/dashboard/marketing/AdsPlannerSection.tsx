// src/components/marketing-hub/AdsPlannerSection.tsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileVisibility from "./ProfileVisibility";
import GetMoreLeads from "./GetMoreLeads";
import CustomerRetention from "./CustomerRetention";
import Guarantee from "./Guaranty";

const AdsPlannerSection: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <Tabs defaultValue="leads" className="w-full">
        {/* Tab Buttons */}
        <div className="overflow-x-auto">
          <TabsList className="flex space-x-2 sm:space-x-4 md:space-x-6 w-max mb-4">
            <TabsTrigger value="leads" className="flex-shrink-0 px-4 py-2">Get More Leads</TabsTrigger>
            <TabsTrigger value="visibility" className="flex-shrink-0 px-4 py-2">Profile Visibility</TabsTrigger>
            <TabsTrigger value="retention" className="flex-shrink-0 px-4 py-2">Customer Retention</TabsTrigger>
            <TabsTrigger value="guarantee" className="flex-shrink-0 px-4 py-2">Guarantee</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="leads" className="w-full mt-4">
          <GetMoreLeads />
        </TabsContent>
        <TabsContent value="visibility" className="w-full mt-4">
          <ProfileVisibility />
        </TabsContent>
        <TabsContent value="retention" className="w-full mt-4">
          <CustomerRetention />
        </TabsContent>
        <TabsContent value="guarantee" className="w-full mt-4">
          <Guarantee />
        </TabsContent>
      </Tabs>
    </div>

  );
};

export default AdsPlannerSection;
