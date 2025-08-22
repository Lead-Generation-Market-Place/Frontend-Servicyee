"use client";
import React, { useState, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ["#023E8A", "#0077B6", "#0096C7", "#90E0EF"];

// Sample data for each month
const rawData = [
  { month: "Jan", purchased: 600, used: 320 },
  { month: "Feb", purchased: 700, used: 400 },
  { month: "Mar", purchased: 500, used: 350 },
  { month: "Apr", purchased: 650, used: 300 },
  { month: "May", purchased: 600, used: 320 },
  { month: "Jun", purchased: 550, used: 310 },
  { month: "Jul", purchased: 700, used: 450 },
  { month: "Aug", purchased: 620, used: 330 },
  { month: "Sep", purchased: 680, used: 400 },
  { month: "Oct", purchased: 710, used: 420 },
  { month: "Nov", purchased: 640, used: 380 },
  { month: "Dec", purchased: 660, used: 390 },
];

const months = ["All Months","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function CreditsCard() {
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  // Filtered data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === "All Months") return rawData;
    return rawData.filter(d => d.month === selectedMonth);
  }, [selectedMonth]);

  // Aggregate totals if "All Months" selected
  const totalPurchased = filteredData.reduce((acc, d) => acc + d.purchased, 0);
  const totalUsed = filteredData.reduce((acc, d) => acc + d.used, 0);

  const creditDonutData = [
    { name: "Purchased", value: totalPurchased },
    { name: "Used", value: totalUsed },
  ];

  return (
    <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E0F2FE] shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-[#023E8A]">
          Credits Purchased vs Used
        </h4>

        {/* Month Filter */}
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={creditDonutData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              labelLine={false}
            >
              {creditDonutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="text-gray-500">Total Purchased</div>
        <div className="text-right font-semibold">{totalPurchased}</div>
        <div className="text-gray-500">Total Used</div>
        <div className="text-right font-semibold">{totalUsed}</div>
      </div>
    </div>
  );
}
