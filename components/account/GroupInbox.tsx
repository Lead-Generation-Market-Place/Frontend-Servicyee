"use client";
import Link from "next/link";

type MessageGroup = {
  id: string;
  name: string;
  slug: "restaurant" | "home_service" | "it" | "other";
  icon: string;
  unreadCount: number;
};

const InboxGroup = () => {
  const groups: MessageGroup[] = [
    {
      id: "1",
      name: "Restaurant",
      slug: "restaurant",
      icon: "🍔",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Home Services",
      slug: "home_service",
      icon: "🏠",
      unreadCount: 20,
    },
    {
      id: "3",
      name: "IT Support",
      slug: "it",
      icon: "💻",
      unreadCount: 13,
    },
  ];

  const getGroupColors = (slug: string) => {
    switch (slug) {
      case "restaurant":
        return {
          light: "bg-orange-100 border-orange-300 hover:bg-orange-50",
          dark: "dark:bg-orange-900/30 dark:border-orange-700 dark:hover:bg-orange-900/40",
        };
      case "home_service":
        return {
          light: "bg-blue-100 border-blue-300 hover:bg-blue-50",
          dark: "dark:bg-blue-900/30 dark:border-blue-700 dark:hover:bg-blue-900/40",
        };
      case "it":
        return {
          light: "bg-purple-100 border-purple-300 hover:bg-purple-50",
          dark: "dark:bg-purple-900/30 dark:border-purple-700 dark:hover:bg-purple-900/40",
        };
      default:
        return {
          light: "bg-gray-100 border-gray-300 hover:bg-gray-50",
          dark: "dark:bg-gray-700/30 dark:border-gray-600 dark:hover:bg-gray-700/40",
        };
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Group Inbox
        </h1>

        <div className="space-y-2">
          {groups.map((group) => {
            const colors = getGroupColors(group.slug);
            return (
              <Link href={`/account/inbox/${group.slug}`} key={group.id}>
                <div
                  className={`p-4 border rounded-lg mt-2 cursor-pointer transition-all 
                  ${colors.light} ${colors.dark}
                  hover:shadow-md dark:hover:shadow-gray-700/30
                  flex justify-between items-center`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{group.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {group.name}
                      </h3>
                    </div>
                  </div>
                  {group.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full dark:bg-red-600">
                      {group.unreadCount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InboxGroup;
