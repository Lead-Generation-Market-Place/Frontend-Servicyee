"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, FileSignature } from "lucide-react";

export default function EarningsPage() {
  const [tab, setTab] = React.useState<string>("overview");

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div>
            <div className="flex items-center gap-6 border-b">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger value="overview" className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900">
                  Overview
                  <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900">
                  Financial documents
                  <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="mt-6">
            <TabsContent value="overview">
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available funds */}
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <div className="text-sm font-medium text-gray-800">Available funds</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="text-sm text-gray-600">Balance available for use</div>
                    <div className="text-4xl font-bold text-gray-900">$0.00</div>
                    <Button className="w-fit" variant="default">Add payout method</Button>
                  </div>
                </div>
                {/* Future payments */}
                <div className="rounded-lg border">
                  <div className="p-4 border-b flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-800">Future payments</div>
                    <span className="text-gray-400">•</span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="text-sm text-gray-600">Payments being cleared</div>
                      <div className="text-2xl font-semibold text-gray-900">$0.00</div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">Payments for active orders</div>
                      <div className="text-2xl font-semibold text-gray-900">$0.00</div>
                    </div>
                  </div>
                </div>
                {/* Earnings & expenses */}
                <div className="rounded-lg border">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-800">Earnings & expenses</div>
                      <span className="text-gray-400">•</span>
                    </div>
                    <div className="text-sm text-gray-500">Since joining</div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="text-sm text-gray-600">Earnings to date</div>
                      <div className="text-2xl font-semibold text-gray-900">$0.00</div>
                      <div className="text-xs text-gray-500">Your earnings since joining.</div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">Expenses to date</div>
                      <div className="text-2xl font-semibold text-gray-900">$0.00</div>
                      <div className="text-xs text-gray-500">Earnings spent on purchases since joining.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">Date range</Button>
                  <Button variant="outline" size="sm">Activity</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Email activity report</Button>
                </div>
              </div>

              {/* Activity table */}
              <div className="mt-4 rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="py-16 text-center">
                          <div className="mx-auto mb-4 h-24 w-24 rounded-full border flex items-center justify-center text-gray-300">
                            {/* simple illustration circle */}
                            <span className="text-3xl">☰</span>
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-1">Beginnings are so exciting!</div>
                          <div className="text-sm text-gray-500">Youll find all your earnings info here once you complete your first order.</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Statement of earnings */}
                <div className="group rounded-xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-50 text-gray-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Statement of earnings</h3>
                      <p className="text-gray-600">Choose a date range and download a statement summarizing your yearly earnings.</p>
                      <div className="mt-4">
                        <Button variant="outline">Choose date range</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form W-9 */}
                <div className="group rounded-xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-50 text-gray-600">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Form W-9</h3>
                      <p className="text-gray-600">You&apos;ve declared you&apos;re not a U.S. person, so you aren&apos;t required to complete a Form W-9.</p>
                      <div className="mt-4">
                        <Button variant="outline">Update your declaration</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}


