import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,

} from "recharts";
import { ArrowUp, ArrowDown, Users, MessageCircle, Clock } from "lucide-react";

// Sample Data
const sparklineData = [
  { x: "Mon", y: 20 },
  { x: "Tue", y: 30 },
  { x: "Wed", y: 25 },
  { x: "Thu", y: 35 },
  { x: "Fri", y: 40 },
  { x: "Sat", y: 45 },
];

export default function LeadsSummary() {
  const totalLeads = 15 + 15 + 5;
  const trend = sparklineData[sparklineData.length - 1].y - sparklineData[0].y;
  const trendPercentage = ((trend / sparklineData[0].y) * 100).toFixed(1);

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-1">Leads Summary</h4>
          <p className="text-xs text-gray-500">Last 7 days performance</p>
        </div>
        <div className="bg-blue-50 text-[#0077B6]] text-xs font-medium px-2.5 py-1 rounded-full">
          Updated today
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
          <div className={`flex items-center gap-1 mt-1 text-xs ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            <span>{trend > 0 ? `+${trend}` : trend} leads ({trendPercentage}%)</span>
          </div>
        </div>
        
        <div className="w-24 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0077B6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="y"
                stroke="#0077B6"
                fill="url(#colorY)"
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Tooltip
                contentStyle={{ 
                  background: "#fff", 
                  borderRadius: 6, 
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px"
                }}
                labelStyle={{ color: "#1F2937", fontWeight: 600 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Users className="w-4 h-4 text-[#0077B6]" />
            <span className="text-xs text-[#0077B6] font-medium">New</span>
          </div>
          <p className="font-bold text-lg text-gray-900">15</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Responded</span>
          </div>
          <p className="font-bold text-lg text-gray-900">10</p>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-amber-600 font-medium">Pending</span>
          </div>
          <p className="font-bold text-lg text-gray-900">5</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Total leads conversion rate</span>
          <span className="font-medium text-gray-700">24.3%</span>
        </div>
      </div>
    </div>
  );
}