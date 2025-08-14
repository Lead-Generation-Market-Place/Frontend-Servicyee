"use client";
import Link from "next/link";

// Define types for our data
// type Message = {
//   id: string;
//   sender: string;
//   content: string;
//   timestamp: Date;
//   read: boolean;
// };

type MessageGroup = {
  id: string;
  name: string;
  slug: "restaurant" | "homeService" | "it" | "other";
  icon: string;
  unreadCount: number;
};

const InboxGroup = () => {
  // Sample data - in a real app, this would come from an API
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
      slug: "homeService",
      icon: "🏠",
      unreadCount: 0,
    },
    {
      id: "3",
      name: "IT Support",
      slug: "it",
      icon: "💻",
      unreadCount: 1,
    },
  ];

  const getGroupColor = (slug: string) => {
    switch (slug) {
      case "restaurant":
        return "bg-orange-100 border-orange-300";
      case "homeService":
        return "bg-blue-100 border-blue-300";
      case "it":
        return "bg-purple-100 border-purple-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Group Inbox</h1>

        <div className="space-y-3">
          {groups.map((group) => (
            <Link href={`/account/inbox/${group.slug}`} key={group.id}>
              <div
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow flex justify-between items-center ${getGroupColor(
                  group.slug
                )}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {group.name}
                    </h3>
                  </div>
                </div>
                {group.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {group.unreadCount}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxGroup;
