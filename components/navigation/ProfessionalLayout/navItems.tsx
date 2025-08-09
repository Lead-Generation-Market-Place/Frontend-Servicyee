import { Briefcase, Mail, Settings, Layers } from "lucide-react";
import React from "react"; // <--- Required for using JSX in objects (icons)

export type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

export type NavItem = {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  subItems?: SubItem[];
};



export const serviceProviderNavItems: NavItem[] = [
  { name: "My Services", path: "/home-services/dashboard/services", icon: <Layers size={18} /> },
  { name: "Loads", path: "/home-services/dashboard/leads", icon: <Briefcase size={18} /> },
  { name: "Inbox", path: "/inbox", icon: <Mail size={18} /> },
  { name: "Performance", path: "/performance", icon: <Settings size={18} /> },
];
