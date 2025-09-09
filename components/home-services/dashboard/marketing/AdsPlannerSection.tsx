// src/components/marketing-hub/AdsPlannerSection.tsx
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileVisibility from "./ProfileVisibility";
import GetMoreLeads from "./GetMoreLeads";
import CustomerRetention from "./CustomerRetention";
import Guarantee from "./Guaranty";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdsPlannerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const tabData = [
    { value: "leads", label: "Get More Leads" },
    { value: "visibility", label: "Profile Visibility" },
    { value: "retention", label: "Customer Retention" },
    { value: "guarantee", label: "Guarantee" }
  ];

  const handleNextTab = () => {
    const currentIndex = tabData.findIndex(tab => tab.value === activeTab);
    const nextIndex = (currentIndex + 1) % tabData.length;
    setActiveTab(tabData[nextIndex].value);
  };

  const handlePrevTab = () => {
    const currentIndex = tabData.findIndex(tab => tab.value === activeTab);
    const prevIndex = (currentIndex - 1 + tabData.length) % tabData.length;
    setActiveTab(tabData[prevIndex].value);
  };

  return (
    <div className="w-full sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Marketing Solutions</h2>
        <p className="text-gray-600 text-center max-w-2xl">
          Optimize your marketing strategy with our tailored solutions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Navigation with responsive design */}
        <div className="relative mb-6">
          {isMobile && (
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handlePrevTab}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous tab"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium text-gray-800">
                {tabData.find(tab => tab.value === activeTab)?.label}
              </span>
              <button 
                onClick={handleNextTab}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next tab"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
          
          <TabsList className={`hidden md:flex w-full bg-gray-100  rounded-xl ${isMobile ? 'hidden' : 'flex'}`}>
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-300 
                  ${activeTab === tab.value 
                    ? 'bg-white text-[#0077B6] shadow-md font-semibold' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Mobile indicator */}
          {isMobile && (
            <div className="flex justify-center space-x-1 mt-2">
              {tabData.map((tab) => (
                <div 
                  key={tab.value}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    activeTab === tab.value ? 'bg-[#0077B6]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <TabsContent value="leads" className="w-full mt-2 animate-fadeIn">
          <GetMoreLeads />
        </TabsContent>
        <TabsContent value="visibility" className="w-full mt-2 animate-fadeIn">
          <ProfileVisibility />
        </TabsContent>
        <TabsContent value="retention" className="w-full mt-2 animate-fadeIn">
          <CustomerRetention />
        </TabsContent>
        <TabsContent value="guarantee" className="w-full mt-2 animate-fadeIn">
          <Guarantee />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdsPlannerSection;
