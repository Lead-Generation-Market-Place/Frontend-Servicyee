"use client";

import * as React from "react";
import {  LayoutGrid, BookOpen, Wrench, ShoppingCart, DollarSign, User, CreditCard, Settings, MessageSquare, LogOut } from "lucide-react";

type DropdownItem = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  icon?: "layout" | "book" | "wrench" | "cart" | "dollar";
};

export default function Sidebar({ items }: { items: NavItem[] }) {
  return (
    <aside className="text-sm">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-6 rounded bg-gray-900" />
        <span className="font-bold text-xl text-gray-900">Seller Panel</span>
      </div>

      {/* Main Links generated from items */}
      <nav className="space-y-4">
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.label} className="">
              {item.hasDropdown ? (
                <div className="my-4">
                  <p className="font-bold text-gray-800 mb-1">{item.label}</p>
                  <div className="pl-2  space-y-1">
                    {item.dropdownItems?.map((sub) => {
                      const label = sub.label.toLowerCase();
                      const SubIcon =
                        label.includes("profile") ? User :
                        label.includes("billing") ? CreditCard :
                        label.includes("setting") ? Settings :
                        label.includes("message") ? MessageSquare :
                        label.includes("logout") ? LogOut :
                        label.includes("earning") ? DollarSign :
                        label.includes("order") ? ShoppingCart :
                        label.includes("service") ? Wrench :
                        label.includes("growth") || label.includes("marketing") ? BookOpen :
                        LayoutGrid;
                      return (
                        <a key={sub.label} href={sub.href} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-800">
                          <SubIcon className="h-4 w-4 text-gray-500" />
                          <span>{sub.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <a href={item.href} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-900">
                  {(() => {
                    const iconMap = {
                      layout: LayoutGrid,
                      book: BookOpen,
                      wrench: Wrench,
                      cart: ShoppingCart,
                      dollar: DollarSign,
                    } as const;
                    const Icon = iconMap[item.icon ?? "layout"];
                    return <Icon className="h-4 w-4 text-gray-500" />;
                  })()}
                  <span>{item.label}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}


