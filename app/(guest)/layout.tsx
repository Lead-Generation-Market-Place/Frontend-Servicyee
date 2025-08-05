import React from "react";

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white dark:bg-gray-950">
          {children}
    </div>
  );
}
