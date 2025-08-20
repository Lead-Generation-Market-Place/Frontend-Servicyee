"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,

} from "recharts";

// Static data
const performanceMetrics = [
  { metric: "Profile Completion", value: 85 },
  { metric: "Job Acceptance", value: 92 },
  { metric: "Avg Rating", value: 94 }, // 4.7/5 -> 94%
  { metric: "Response Rate", value: 90 },
];

const trendData = [
  { day: "Mon", completion: 70 },
  { day: "Tue", completion: 75 },
  { day: "Wed", completion: 78 },
  { day: "Thu", completion: 80 },
  { day: "Fri", completion: 85 },
  { day: "Sat", completion: 87 },
  { day: "Sun", completion: 90 },
];

export default function ProfilePerformanceAdvanced() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-96 flex flex-col space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-700">Profile Performance</h3>
      </div>

      {/* Metrics Bar Chart */}
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceMetrics} layout="vertical" margin={{ top: 10 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
            <YAxis type="category" dataKey="metric" width={140} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="value" fill="#0077B6" barSize={20} radius={[5, 5, 5, 5]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Profile Completion Trend (Bar Style) */}
      <div className="w-full h-40">
        <p className="text-sm text-gray-500 mb-2">Profile Completion Trend</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData} margin={{ top: 10 }}>
            <XAxis dataKey="day" />
            <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="completion" fill="#0077B6" barSize={20} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
