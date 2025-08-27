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

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Inter",
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    colors: ["#0077B6", "#90E0EF"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["#fff"] },
    xaxis: {
      categories: MONTHS,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { title: { text: "Amount ($)" } },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Inter",
    },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number, opts) => {
          const seriesName = opts.seriesIndex === 0 ? "Cost Spent" : "Credits Received";
          return `${seriesName}: $${val}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: { plotOptions: { bar: { columnWidth: "55%" } } },
      },
      {
        breakpoint: 768,
        options: { plotOptions: { bar: { columnWidth: "70%" } }, legend: { fontSize: "12px" } },
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: { bar: { columnWidth: "90%" } },
          legend: { fontSize: "10px" },
        },
      },
    ],
  };

  const filteredSeries = useMemo(() => {
    let filteredData = rawData;

    if (selectedService !== "All Services") {
      filteredData = filteredData.filter(d => d.service === selectedService);
    }

    if (selectedYear !== "All Years") {
      filteredData = filteredData.filter(d => d.year === selectedYear);
    }

    let costSpent = new Array(12).fill(0);
    let creditsReceived = new Array(12).fill(0);

    filteredData.forEach(d => {
      d.creditsUsed.forEach((val, idx) => { costSpent[idx] += val });
      d.creditsRemaining.forEach((val, idx) => { creditsReceived[idx] += val });
    });

    if (selectedMonth !== "All Months") {
      const monthIndex = MONTHS.indexOf(selectedMonth);
      costSpent = costSpent.map((v, idx) => (idx === monthIndex ? v : 0));
      creditsReceived = creditsReceived.map((v, idx) => (idx === monthIndex ? v : 0));
    }

    return [
      { name: "Cost Spent", data: costSpent },
      { name: "Credits Received", data: creditsReceived },
    ];
  }, [selectedService, selectedMonth, selectedYear]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Monthly Cost & Credits
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

      <div className="w-full">
        <ReactApexChart
          options={options}
          series={filteredSeries}
          type="bar"
          width="100%"
          height={300}
        />
      </div>
    </div>
  );
}
