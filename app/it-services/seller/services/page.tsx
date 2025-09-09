"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal } from "lucide-react";

type Service = {
  title: string;
  category: string;
  status: "active" | "paused" | "draft" | "rejected";
  price: string;
  orders: number;
  created: string;
  image: string;
};

const SERVICES: Service[] = [
  { 
    title: "Professional Logo Design", 
    category: "Logo Design", 
    status: "active", 
    price: "$50", 
    orders: 24, 
    created: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center"
  },
  { 
    title: "E-commerce Website Development", 
    category: "Web Development", 
    status: "active", 
    price: "$500", 
    orders: 8, 
    created: "1 month ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center"
  },
  { 
    title: "Social Media Graphics Package", 
    category: "Graphic Design", 
    status: "paused", 
    price: "$25", 
    orders: 12, 
    created: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center"
  },
  { 
    title: "Brand Identity Package", 
    category: "Branding", 
    status: "draft", 
    price: "$200", 
    orders: 0, 
    created: "1 week ago",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center"
  },
  { 
    title: "Mobile App UI/UX Design", 
    category: "UI/UX Design", 
    status: "rejected", 
    price: "$300", 
    orders: 0, 
    created: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop&crop=center"
  },
  { 
    title: "Business Card Design", 
    category: "Print Design", 
    status: "active", 
    price: "$15", 
    orders: 35, 
    created: "1 month ago",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center"
  },
];

function getStatusBadge(status: Service["status"]) {
  switch (status) {
    case "active":
      return <span className="text-green-700">Active</span>;
    case "paused":
      return <span className="text-yellow-700">Paused</span>;
    case "draft":
      return <span className="text-gray-700">Draft</span>;
    case "rejected":
      return <span className="text-red-700">Rejected</span>;
    default:
      return <span className="text-gray-700">{status}</span>;
  }
}

function ServicesTable({ services }: { services: Service[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.add('flex');
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-900">{service.title}</TableCell>
              <TableCell className="text-gray-700">{service.category}</TableCell>
              <TableCell>{getStatusBadge(service.status)}</TableCell>
              <TableCell className="font-semibold text-gray-900">{service.price}</TableCell>
              <TableCell className="text-gray-700">{service.orders}</TableCell>
              <TableCell className="text-gray-700">{service.created}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="Open actions">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function ServicesPage() {
  const [tab, setTab] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    if (tab === "all") return SERVICES;
    if (tab === "active") return SERVICES.filter((s) => s.status === "active");
    if (tab === "paused") return SERVICES.filter((s) => s.status === "paused");
    if (tab === "draft") return SERVICES.filter((s) => s.status === "draft");
    if (tab === "rejected") return SERVICES.filter((s) => s.status === "rejected");
    return SERVICES;
  }, [tab]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto  ">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Services & Gigs</h1>
            <p className="text-gray-600">Manage your service offerings and track performance.</p>
          </div>
          <Button>Create New Service</Button>
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
                    <span className="hidden md:inline ml-2 text-gray-400">({SERVICES.length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Active</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({SERVICES.filter(s => s.status === 'active').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="paused"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Paused</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({SERVICES.filter(s => s.status === 'paused').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="draft"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Draft</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({SERVICES.filter(s => s.status === 'draft').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="rejected"
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    <span>Rejected</span>
                    <span className="hidden md:inline ml-2 text-gray-400">({SERVICES.filter(s => s.status === 'rejected').length})</span>
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
           
          </div>

          {/* Table content separated from tabs header */}
          <div className="mt-6">
            <TabsContent value="all">
              <ServicesTable services={filtered} />
            </TabsContent>
            <TabsContent value="active">
              <ServicesTable services={filtered} />
            </TabsContent>
            <TabsContent value="paused">
              <ServicesTable services={filtered} />
            </TabsContent>
            <TabsContent value="draft">
              <ServicesTable services={filtered} />
            </TabsContent>
            <TabsContent value="rejected">
              <ServicesTable services={filtered} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
