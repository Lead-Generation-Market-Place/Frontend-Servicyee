"use client";
import React, { JSX, useState, useMemo } from "react";
import { 
  CheckCircle, 
  MapPin, 
  PlusCircle, 
  Key, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter,
  Calendar,
  Clock,
  X
} from "lucide-react";

interface Activity {
  id: number;
  action: string;
  type: string;
  date: string;
  priority?: "low" | "medium" | "high";
}

const activities: Activity[] = [
  { id: 1, action: "Accepted a new lead from John Smith", type: "lead", date: "2025-08-20T09:15:00Z", priority: "high" },
  { id: 2, action: "Added plumbing repair service", type: "service", date: "2025-08-19T14:10:00Z", priority: "medium" },
  { id: 3, action: "Updated service area on the map", type: "map", date: "2025-08-18T11:20:00Z", priority: "medium" },
  { id: 4, action: "Changed account password", type: "password", date: "2025-08-18T09:05:00Z", priority: "low" },
  { id: 5, action: "Accepted a new lead from Sarah Johnson", type: "lead", date: "2025-08-17T16:30:00Z", priority: "high" },
  { id: 6, action: "Updated business hours", type: "service", date: "2025-08-16T13:45:00Z", priority: "low" },
  { id: 7, action: "Added emergency service area", type: "map", date: "2025-08-15T10:20:00Z", priority: "high" },
  { id: 8, action: "Reset two-factor authentication", type: "password", date: "2025-08-14T08:15:00Z", priority: "medium" },
];

const activityIcons: Record<string, { icon: JSX.Element; bgColor: string; color: string }> = {
  lead: { 
    icon: <CheckCircle className="w-4 h-4" />, 
    bgColor: "bg-green-100", 
    color: "text-green-700" 
  },
  service: { 
    icon: <PlusCircle className="w-4 h-4" />, 
    bgColor: "bg-blue-100", 
    color: "text-blue-700" 
  },
  map: { 
    icon: <MapPin className="w-4 h-4" />, 
    bgColor: "bg-amber-100", 
    color: "text-amber-700" 
  },
  password: { 
    icon: <Key className="w-4 h-4" />, 
    bgColor: "bg-red-100", 
    color: "text-red-700" 
  },
};

const priorityColors: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    }
    return `${diffInHours} hr ago`;
  }
  
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    year: now.getFullYear() !== date.getFullYear() ? "numeric" : undefined
  });
}

export default function ProfessionalUserActivityCard() {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const activityTypes = [...new Set(activities.map(act => act.type))];

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "all" || activity.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const displayedActivities = expanded ? filteredActivities : filteredActivities.slice(0, 3);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 min-w-[180px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Filter by</span>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`block w-full text-left px-2 py-1 text-sm rounded-md ${activeFilter === "all" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    All Activities
                  </button>
                  
                  {activityTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`block w-full text-left px-2 py-1 text-sm rounded-md capitalize ${activeFilter === type ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#0077B6] focus:border-[#0077B6] outline-none transition-colors"
        />
      </div>

      {(searchQuery || activeFilter !== "all") && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {filteredActivities.length} result{filteredActivities.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== "all" && ` in ${activeFilter}`}
          </span>
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Clear filters
            <X className="w-3 h-3 ml-1" />
          </button>
        </div>
      )}

      {filteredActivities.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-gray-400 mb-2">No activities found</div>
          <p className="text-sm text-gray-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-gray-100">
            {displayedActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <span className={`p-2 rounded-full mt-0.5 ${activityIcons[act.type].bgColor} ${activityIcons[act.type].color}`}>
                    {activityIcons[act.type].icon}
                  </span>
                  <div>
                    <span className="text-sm font-medium text-gray-800 block">{act.action}</span>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(act.date)}</span>
                      <Clock className="w-3 h-3 ml-2 mr-1" />
                      <span>{formatTime(act.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400 mb-2">{formatDateTime(act.date)}</span>
                  {act.priority && (
                    <span className={`inline-block w-2 h-2 rounded-full ${priorityColors[act.priority]}`}></span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length > 3 && (
            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    View All Activities ({filteredActivities.length})
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}