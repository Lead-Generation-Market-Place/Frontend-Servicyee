// app/components/CustomerRequests.tsx
"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface Request {
  id: number;
  name: string;
  category: string;
  timeAgo: string;
  location: string;
  dateRange: string;
  openDates: boolean;
  discount?: string;
  tags: string[];
}

const requests: Request[] = [
  {
    id: 1,
    name: "AM",
    category: "Home Theater Specialist",
    timeAgo: "about 15 hours ago",
    location: "Arlington, VA 22201",
    dateRange: "Aug 5-7",
    openDates: true,
    tags: [
      "Wall mount",
      "Not sure, need professional's help to determine",
      "TV ≤ 60 inches",
      "Yes, outlet nearby",
      "No cable concealment",
      "Have mount/stand",
      "Flat wall (fixed)",
      "Not sure",
      "None",
      "22201",
    ],
  },
  {
    id: 2,
    name: "AF",
    category: "Electrician",
    timeAgo: "about 20 hours ago",
    location: "Alexandria, VA 22310",
    dateRange: "Aug 5-11",
    openDates: true,
    tags: [
      "Fixture or outlet issue",
      "Lights",
      "10 - 14 ft ceiling",
      "House",
      "22310",
    ],
  },
];

export default function CustomerRequests() {
  const [category, setCategory] = useState("All Categories");

  return (
    <div >
      <div className="w-full max-w-5xl mx-auto p-4 transition-colors duration-300 dark:bg-gray-900 min-h-screen">
        
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6">
<div className="flex flex-wrap gap-3 items-center">
  {/* Category Select */}
  <Select value={category} onValueChange={(val) => setCategory(val)}>
    <SelectTrigger className="w-[220px] rounded-[4px] border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring-[#0077B6]">
      <SelectValue placeholder="All Categories" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="All Categories">All Services</SelectItem>
      <SelectItem value="Home Theater Specialist">
        Home Theater Specialist
      </SelectItem>
      <SelectItem value="Electrician">Electrician</SelectItem>
    </SelectContent>
  </Select>

  {/* Distance Select */}

  {/* Sort Select */}
  <Select defaultValue="relevant">
    <SelectTrigger className="w-[180px] rounded-[4px] border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring-[#0077B6]">
      <SelectValue placeholder="Most Relevant" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="relevant">Most Relevant</SelectItem>
      <SelectItem value="newest">Newest</SelectItem>
      <SelectItem value="oldest">Oldest</SelectItem>
    </SelectContent>
  </Select>
</div>


        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-5"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="text-[#0077B6]">{req.name}</span> Contacted{" "}
                    <span>{req.category}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {req.timeAgo} 
                  </p>
                </div>

              </div>

              {/* Discount */}
              {req.discount && (
                <span className="inline-block mt-3 text-xs font-medium bg-[#0077B6]/10 text-[#0077B6] px-2 py-1 rounded-[4px]">
                  {req.discount}
                </span>
              )}

              {/* Location & Date */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#0077B6]" />
                  {req.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#0077B6]" />
                  {req.dateRange}
                  {req.openDates && (
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      (Open to other dates)
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {req.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-[#0077B6]/10 hover:text-[#0077B6] dark:hover:bg-[#0077B6]/20 text-gray-700 dark:text-gray-200 text-xs rounded-[4px] transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end mt-4">
                <Link href={`/home-services/dashboard/leads/${req.id}`} className="bg-[#0077B6] text-white px-4 py-2 rounded-[4px] text-sm font-medium hover:bg-[#005f8a] transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
