"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyLeads() {
  const series = [75.55];
  const options: ApexOptions = {
    colors: ["#0077B6"],
    chart: {
      type: "radialBar",
      height: 180,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "70%" },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
        },
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
      <h4 className="text-sm font-medium text-[#023E8A] mb-2">
        Monthly Leads
      </h4>

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
        <div className="text-right font-semibold">10</div>

        <div className="text-gray-500">Achieved</div>
        <div className="text-right font-semibold">7</div>
      </div>
    </div>
  );
}
