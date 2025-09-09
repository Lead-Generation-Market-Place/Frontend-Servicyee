// src/components/marketing-hub/AdsPlannerSection.tsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileVisibility from "./ProfileVisibility";
import GetMoreLeads from "./GetMoreLeads";
import CustomerRetention from "./CustomerRetention";
import Guarantee from "./Guaranty";

const AdsPlannerSection: React.FC = () => {
  return (
    <div className="w-full sm:px-6 md:px-8">
      <Tabs defaultValue="leads" className="w-full">
        {/* Tab Buttons */}
        <TabsList className="flex flex-wrap  mb-4 w-full">
          <TabsTrigger
            value="leads"
            className="flex-1 min-w-[150px] text-center px-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get More Leads
          </TabsTrigger>
          <TabsTrigger
            value="visibility"
            className="flex-1 min-w-[150px] text-center px-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Profile Visibility
          </TabsTrigger>
          <TabsTrigger
            value="retention"
            className="flex-1 min-w-[150px] text-center px-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Customer Retention
          </TabsTrigger>
          <TabsTrigger
            value="guarantee"
            className="flex-1 min-w-[150px] text-center px-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Guarantee
          </TabsTrigger>
        </TabsList>

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
