"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Clock,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Earnings",
      value: "$2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Active Orders",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Clock,
      description: "In progress",
    },
    {
      title: "Profile Views",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Eye,
      description: "This week",
    },
    {
      title: "Response Rate",
      value: "98%",
      change: "+2%",
      changeType: "positive" as const,
      icon: MessageSquare,
      description: "Last 30 days",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      title: "Logo Design for Tech Startup",
      client: "Sarah Johnson",
      status: "in_progress",
      deadline: "2 days",
      amount: "$150",
    },
    {
      id: "ORD-002",
      title: "Website Development",
      client: "Mike Chen",
      status: "completed",
      deadline: "Delivered",
      amount: "$850",
    },
    {
      id: "ORD-003",
      title: "Brand Identity Package",
      client: "Emma Wilson",
      status: "pending",
      deadline: "5 days",
      amount: "$300",
    },
  ];

  const recentGigs = [
    {
      id: "SRV-001",
      title: "Professional Logo Design",
      category: "Logo Design",
      status: "active",
      created: "2 days ago",
      price: "$50",
    },
    {
      id: "SRV-002",
      title: "E-commerce Website Development",
      category: "Web Development",
      status: "active",
      created: "1 week ago",
      price: "$500",
    },
    {
      id: "SRV-003",
      title: "Social Media Graphics Package",
      category: "Graphic Design",
      status: "paused",
      created: "3 days ago",
      price: "$25",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here&#39;s what&#39;s happening with your business.</p>
      </div>

      {/* Stats Grid (simple boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg border p-4 ">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="flex items-center text-sm">
              <span
                className={`font-medium ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-500 ml-1">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid (simple sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <section className="rounded-lg ">
            <div className="px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-500">Your latest client projects and their status</p>
            </div>
            <div className="pt-4">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-md  hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{order.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Client: {order.client}</p>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {order.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{order.amount}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </div>
            </div>
          </section>

          {/* Recent Created Gigs */}
          <section className="rounded-lg mt-8">
            <div className="px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Created Gigs</h2>
              <p className="text-sm text-gray-500">Your newly created services and their status</p>
            </div>
            <div className="pt-4">
              <div className="space-y-4">
                {recentGigs.map((gig) => (
                  <div
                    key={gig.id}
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{gig.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Category: {gig.category}</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          {gig.status}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {gig.created}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{gig.price}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  View All Gigs
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <section className="rounded-lg border ">
            <div className="px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <p className="text-sm text-gray-500">Your profile metrics this month</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profile Completion</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">On-time Delivery</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9 Rating</span>
                  </div>
                  <span className="text-sm text-gray-500">127 reviews</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-lg border ">
            <div className="px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Create New Gig
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Orders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                View Messages
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </div>
          </section>

          
        </div>
      </div>
    </div>
  );
}