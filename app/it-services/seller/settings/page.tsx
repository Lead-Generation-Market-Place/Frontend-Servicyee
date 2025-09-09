"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [tab, setTab] = React.useState<string>("general");

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div>
            <div className="flex items-center gap-6 border-b">
              <TabsList className="bg-transparent p-0 h-auto">
                {[
                  { key: "general", label: "General" },
                  { key: "notifications", label: "Notifications" },
                  { key: "security", label: "Security" },
                  { key: "appearance", label: "Appearance" },
                ].map(({ key, label }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="relative px-0 pb-4 mr-8 rounded-none uppercase tracking-wide text-gray-500 data-[state=active]:text-gray-900"
                  >
                    {label}
                    <span className="hidden data-[state=active]:block absolute left-1/2 -bottom-[9px] h-2 w-2 -translate-x-1/2 rotate-45 border border-gray-300 bg-white"></span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <div className="mt-6 space-y-8">
            {/* General */}
            <TabsContent value="general">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Your username" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="e.g. +1 555 123 4567" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="language">Preferred Language</Label>
                      <select
                        id="language"
                        className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-black focus:outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select language
                        </option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                        <option value="hi">Hindi</option>
                        <option value="ar">Arabic</option>
                        <option value="pt">Portuguese</option>
                        <option value="ru">Russian</option>
                        <option value="ja">Japanese</option>
                        {/* Add more languages as needed */}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability Hours</Label>
                    
                      <div className="flex gap-2">
                        <Input
                          id="availability-start"
                          type="datetime-local"
                          className="mt-1"
                          placeholder="Start time"
                        />
                        <span className="self-center text-gray-500">to</span>
                        <Input
                          id="availability-end"
                          type="datetime-local"
                          className="mt-1"
                          placeholder="End time"
                        />
                      </div>
                    </div>

                    <Button className="mt-2">Save changes</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <div >
                <h3 className="text-lg font-semibold mb-4">Email notifications</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Enabled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { type: "Order updates", desc: "Status changes and delivery updates" },
                      { type: "Messages", desc: "New messages from clients" },
                      { type: "Gig view", desc: "Get notified when someone views your gig" },
                      { type: "Gig update", desc: "Get notified about changes to your gigs" },
                    ].map((row) => (
                      <TableRow key={row.type}>
                        <TableCell className="font-medium">{row.type}</TableCell>
                        <TableCell className="text-gray-600">{row.desc}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">Toggle</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <div className="grid grid-cols-1  gap-6">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold mb-2">Password</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" className="mt-1" />
                    </div>
                    <Button className="mt-1">Update password</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold mb-2">Two-factor auth</h3>
                  <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account.</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold mb-2">Active sessions</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Windows • Chrome</TableCell>
                        <TableCell>Quetta, PK</TableCell>
                        <TableCell className="text-right"><Button size="sm" variant="outline">Sign out</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                {/* Deactivate Account Section */}
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Deactivate Account</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Deactivating your account will disable your profile and remove access to your dashboard. You can reactivate your account by logging in again.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div>
                      <Label htmlFor="deactivate-reason" className="mb-1 block">Reason for deactivating</Label>
                      <select
                        id="deactivate-reason"
                        className="block w-56 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a reason
                        </option>
                        <option value="privacy">Privacy concerns</option>
                        <option value="not-using">No longer using the service</option>
                        <option value="issues">Technical issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button variant="destructive" className="mt-2 sm:mt-6">
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

          

            {/* Appearance */}
            <TabsContent value="appearance">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Theme</h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline">Light</Button>
                  <Button variant="outline">Dark</Button>
                  <Button>System</Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}


