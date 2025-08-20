import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#023E8A", "#0077B6", "#0096C7", "#90E0EF"];
const creditDonutData = [
  { name: "Purchased", value: 600 },
  { name: "Used", value: 320 },
];

export default function CreditsCard() {
  return (
    <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E0F2FE] shadow-sm">
      <h4 className="text-sm font-medium text-[#023E8A] mb-2">Credits Purchased vs Used</h4>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={creditDonutData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} labelLine={false}>
              {creditDonutData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="text-gray-500">Total Purchased</div><div className="text-right font-semibold">600</div>
        <div className="text-gray-500">Total Used</div><div className="text-right font-semibold">320</div>
      </div>
    </div>
  );
}
