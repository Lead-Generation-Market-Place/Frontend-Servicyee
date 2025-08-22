"use client";
import React from "react";
import { ResponsiveContainer, Area, AreaChart, Tooltip } from "recharts";
import { Mail, Star, ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample Data
const reviews = [
  {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    message: "Excellent service, very professional!",
    rating: 5,
    date: "2025-08-19T14:30:00Z",
  },
  {
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@email.com",
    message: "Quick response and good work.",
    rating: 4,
    date: "2025-08-18T10:15:00Z",
  },
  {
    firstName: "Maria",
    lastName: "Lopez",
    email: "maria.lopez@email.com",
    message: "Affordable but could improve timing.",
    rating: 3,
    date: "2025-08-17T09:00:00Z",
  },
];

// Sparkline for ratings trend
const ratingsTrend = [
  { x: "Mon", y: 3.2 },
  { x: "Tue", y: 3.8 },
  { x: "Wed", y: 4.0 },
  { x: "Thu", y: 4.5 },
  { x: "Fri", y: 4.2 },
  { x: "Sat", y: 4.6 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentReviewsCard() {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const trend =
    ratingsTrend[ratingsTrend.length - 1].y - ratingsTrend[0].y;
  const trendPercentage = ((trend / ratingsTrend[0].y) * 100).toFixed(1);

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-1">
            Recent Reviews
          </h4>
          <p className="text-xs text-gray-500">
            Customer feedback overview
          </p>
        </div>
        <div className="bg-blue-50 text-[#0077B6] text-xs font-medium px-2.5 py-1 rounded-full">
          Updated today
        </div>
      </div>

      {/* Summary + Chart */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {avgRating.toFixed(1)}/5
          </p>
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            <span>
              {trend > 0 ? `+${trend.toFixed(1)}` : trend.toFixed(1)} pts (
              {trendPercentage}%)
            </span>
          </div>
        </div>
        <div className="w-24 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ratingsTrend}>
              <defs>
                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0077B6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="y"
                stroke="#0077B6"
                fill="url(#colorRating)"
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: 6,
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {/* Avatar + Name + Email */}
            <div className="flex items-center gap-3 w-full sm:w-1/3">
              <Avatar className="w-10 h-10 text-xs font-semibold">
                <AvatarFallback>
                  {rev.firstName.charAt(0).toUpperCase()}
                  {rev.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {rev.firstName} {rev.lastName}
                </p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Mail className="w-3 h-3" /> {rev.email}
                </p>
                <StarRating rating={rev.rating} />
              </div>
            </div>

            {/* Message + Date */}
            <div className="flex flex-col justify-between w-full sm:w-2/3">
              <p className="text-[13px] text-gray-700 text-right">{rev.message}</p>
              <p className="text-[11px] text-gray-400 text-right mt-1">
                {formatDateTime(rev.date)}
              </p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
