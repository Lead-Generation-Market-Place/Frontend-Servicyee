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

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Sample leads data
const rawData = [
  { month: "Jan", leads: 168 },
  { month: "Feb", leads: 385 },
  { month: "Mar", leads: 201 },
  { month: "Apr", leads: 298 },
  { month: "May", leads: 187 },
  { month: "Jun", leads: 195 },
  { month: "Jul", leads: 291 },
  { month: "Aug", leads: 110 },
  { month: "Sep", leads: 215 },
  { month: "Oct", leads: 390 },
  { month: "Nov", leads: 280 },
  { month: "Dec", leads: 112 },
];

const months = ["All Months", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function MonthlyLeadsChart() {
  const [selectedMonth, setSelectedMonth] = useState("All Months");



  // Filtered data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === "All Months") return rawData;
    return rawData.filter(d => d.month === selectedMonth);
  }, [selectedMonth]);

  // Chart series and categories
  const series = [
    {
      name: "Leads",
      data: filteredData.map(d => d.leads),
    },
  ];
  const categories = filteredData.map(d => d.month);

  const options: ApexOptions = {
    colors: ["#0077B6"],
    chart: {
      fontFamily: "inter",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: { categories },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: { x: { show: false }, y: { formatter: (val: number) => `${val}` } },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
           Monthly Leads
        </h3>

        <div className="flex items-center gap-3">
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
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
