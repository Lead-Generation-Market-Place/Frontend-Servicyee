"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreVertical } from "lucide-react";
import { useState, useMemo } from "react";

import { DropdownItem } from "@/components/ui/dropdownitems";
import { Dropdown } from "@/components/ui/dropdown";
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

// ✅ Define months outside so we don’t depend on options inside useMemo
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Example raw data
const rawData = [
  {
    service: "Plumbing",
    year: "2025",
    creditsUsed: [120, 150, 90, 200, 180, 160, 210, 130, 170, 190, 140, 110],
    creditsRemaining: [80, 50, 110, 50, 70, 90, 40, 120, 80, 60, 100, 140],
  },
  {
    service: "Cleaning",
    year: "2025",
    creditsUsed: [100, 120, 80, 150, 160, 140, 180, 110, 130, 170, 120, 90],
    creditsRemaining: [100, 80, 120, 100, 60, 80, 90, 140, 110, 130, 140, 160],
  },
  {
    service: "Electrician",
    year: "2025",
    creditsUsed: [90, 110, 70, 130, 140, 120, 160, 100, 120, 150, 110, 80],
    creditsRemaining: [110, 90, 130, 120, 60, 80, 100, 140, 120, 140, 130, 160],
  },
];

export default function MonthlyCreditsUsageAdvanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState("2025");

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function closeDropdown() {
    setIsOpen(false);
  }

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 250,
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Inter",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
      },
    },
    colors: ["#0077B6", "#90E0EF"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["#fff"] },
    xaxis: {
      categories: MONTHS, // ✅ use MONTHS constant
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { title: { text: "Credits" } },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Inter",
    },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} credits`,
      },
    },
  };

  // ✅ Now MONTHS is stable, no warning
  const filteredSeries = useMemo(() => {
    let filteredData = rawData;

    if (selectedService !== "All Services") {
      filteredData = filteredData.filter(d => d.service === selectedService);
    }

    if (selectedYear !== "All Years") {
      filteredData = filteredData.filter(d => d.year === selectedYear);
    }

    let creditsUsed = new Array(12).fill(0);
    let creditsRemaining = new Array(12).fill(0);

    filteredData.forEach(d => {
      d.creditsUsed.forEach((val, idx) => { creditsUsed[idx] += val });
      d.creditsRemaining.forEach((val, idx) => { creditsRemaining[idx] += val });
    });

    if (selectedMonth !== "All Months") {
      const monthIndex = MONTHS.indexOf(selectedMonth);
      creditsUsed = creditsUsed.map((v, idx) => (idx === monthIndex ? v : 0));
      creditsRemaining = creditsRemaining.map((v, idx) => (idx === monthIndex ? v : 0));
    }

    return [
      { name: "Credits Used", data: creditsUsed },
      { name: "Credits Remaining", data: creditsRemaining },
    ];
  }, [selectedService, selectedMonth, selectedYear]); // ✅ no options dependency

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Monthly Usage of Credits
        </h3>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreVertical className="text-gray-400 hover:text-gray-700" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Services">All Services</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Cleaning">Cleaning</SelectItem>
            <SelectItem value="Electrician">Electrician</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Months">All Months</SelectItem>
            {MONTHS.map(month => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="max-w-full overflow-x-auto">
        <ReactApexChart
          options={options}
          series={filteredSeries}
          type="bar"
          height={250}
        />
      </div>
    </div>
  );
}
