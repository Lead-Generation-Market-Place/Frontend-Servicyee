"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Sample data for each month
const rawData = [
  { month: "Jan", target: 10, achieved: 7 },
  { month: "Feb", target: 12, achieved: 9 },
  { month: "Mar", target: 15, achieved: 11 },
  { month: "Apr", target: 8, achieved: 6 },
  { month: "May", target: 10, achieved: 7 },
  { month: "Jun", target: 14, achieved: 10 },
  { month: "Jul", target: 13, achieved: 12 },
  { month: "Aug", target: 10, achieved: 8 },
  { month: "Sep", target: 9, achieved: 6 },
  { month: "Oct", target: 11, achieved: 10 },
  { month: "Nov", target: 12, achieved: 9 },
  { month: "Dec", target: 15, achieved: 13 },
];

const months = ["All Months", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function MonthlyLeads() {
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  // Filtered data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === "All Months") return rawData;
    return rawData.filter(d => d.month === selectedMonth);
  }, [selectedMonth]);

  // Aggregate totals if "All Months" selected
  const totalTarget = filteredData.reduce((acc, d) => acc + d.target, 0);
  const totalAchieved = filteredData.reduce((acc, d) => acc + d.achieved, 0);
  const progress = totalTarget > 0 ? (totalAchieved / totalTarget) * 100 : 0;

  const series = [parseFloat(progress.toFixed(2))];

  const options: ApexOptions = {
    colors: ["#0077B6"],
    chart: { type: "radialBar", height: 180, sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "70%" },
        track: { background: "#E4E7EC", strokeWidth: "100%" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "20px",
            fontWeight: "600",
            offsetY: -10,
            color: "#023E8A",
            formatter: (val) => val + "%",
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#0077B6"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  return (
    <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E0F2FE] shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-[#023E8A]">
          Monthly Leads
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

      <div className="h-44 w-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={180}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="text-gray-500">Target</div>
        <div className="text-right font-semibold">{totalTarget}</div>

        <div className="text-gray-500">Achieved</div>
        <div className="text-right font-semibold">{totalAchieved}</div>
      </div>
    </div>
  );
}
