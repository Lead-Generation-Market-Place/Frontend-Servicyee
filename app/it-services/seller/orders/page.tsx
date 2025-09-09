"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Order = {
  title: string;
  client: string;
  avatar?: string;
  status: "active" | "completed" | "cancelled" | "pending";
  deadline: string;
  amount: string;
};

const ORDERS: Order[] = [
  { title: "Landing Page Design", client: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces", status: "active", deadline: "2 days", amount: "$450" },
  { title: "E-commerce Website", client: "Mike Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces", status: "completed", deadline: "Delivered", amount: "$2,100" },
  { title: "Logo Refresh", client: "Emma Wilson", status: "pending", deadline: "5 days", amount: "$180" },
  { title: "Brand Guidelines", client: "Daniel Smith", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=faces", status: "active", deadline: "1 week", amount: "$700" },
  { title: "Marketing Assets", client: "Olivia Brown", status: "cancelled", deadline: "-", amount: "$0" },
  { title: "Portfolio Revamp", client: "James Lee", status: "completed", deadline: "Delivered", amount: "$650" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const second = parts[1]?.charAt(0) ?? "";
  return (first + second).toUpperCase();
}

function getStatusBadge(status: Order["status"]) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case "active":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-lg ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Buyer</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={order.avatar ?? ""} alt={order.client} />
                    <AvatarFallback>{getInitials(order.client)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-900 font-medium">{order.client}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-900">{order.title}</TableCell>
              <TableCell className="text-gray-700">{order.client}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-gray-700">{order.deadline}</TableCell>
              <TableCell className="text-right font-semibold text-gray-900">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    if (tab === "all") return ORDERS;
    if (tab === "active") return ORDERS.filter((o) => o.status === "active");
    if (tab === "completed") return ORDERS.filter((o) => o.status === "completed");
    if (tab === "cancelled") return ORDERS.filter((o) => o.status === "cancelled");
    if (tab === "pending") return ORDERS.filter((o) => o.status === "pending");
    return ORDERS;
  }, [tab]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Orders</h1>
            <p className="text-gray-600">Track and manage all your client orders.</p>
          </div>
          <Button variant="outline">Export CSV</Button>
        </div>

        {/* Tabs header section */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div>
            <div className="px-0 pt-0">
              <div className="flex flex-wrap items-center gap-6 border-b">
                <TabsList className="bg-transparent p-0 h-auto text-muted-foreground">
                  <TabsTrigger
                    value="all"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>All</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({ORDERS.length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Active</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({ORDERS.filter(o => o.status === 'active').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Completed</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({ORDERS.filter(o => o.status === 'completed').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Pending</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({ORDERS.filter(o => o.status === 'pending').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancelled"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Cancelled</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({ORDERS.filter(o => o.status === 'cancelled').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

          </div>

          {/* Table content separated from tabs header */}
          <div className="mt-6">
            <TabsContent value="all">
              <OrdersTable orders={filtered} />
            </TabsContent>
            <TabsContent value="active">
              <OrdersTable orders={filtered} />
            </TabsContent>
            <TabsContent value="completed">
              <OrdersTable orders={filtered} />
            </TabsContent>
            <TabsContent value="pending">
              <OrdersTable orders={filtered} />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrdersTable orders={filtered} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}


