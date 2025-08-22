"use client";
import Image from "next/image";
import { Paperclip, Camera, Send, Menu, X } from "lucide-react";
import { use, useState } from "react";

// Define types for our data structures
type User = {
  id: number;
  firstName: string;
  lastName: string;
  lastMessage: string;
  unread: number;
  online: boolean;
  hasProfilePic: boolean;
};

const MessagePage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const groupName = slug.replace(/_/, " ");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Sample user data with proper typing
  const users: User[] = [
    {
      id: 1,
      firstName: "Esmatullah",
      lastName: "Hashimi",
      lastMessage: "Hello there how are you?",
      unread: 3,
      online: true,
      hasProfilePic: true,
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      lastMessage: "Can we meet tomorrow?",
      unread: 0,
      online: false,
      hasProfilePic: false,
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Smith",
      lastMessage: "I sent you the files",
      unread: 1,
      online: true,
      hasProfilePic: false,
    },
  ];

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setMobileChatOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold capitalize">{groupName} Messages</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {/* Desktop title */}

        {/* Main content */}
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[calc(100vh-180px)] md:h-[80vh]">
          {/* Mobile sidebar overlay */}
          {(mobileSidebarOpen || !mobileChatOpen) && (
            <div
              className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 ${
                mobileSidebarOpen ? "block" : "hidden"
              }`}
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
          )}

          {/* Inbox sidebar - shown on mobile when menu clicked */}
          <div
            className={`w-full md:w-[30%] lg:w-[25%] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-30 ${
              mobileSidebarOpen || !mobileChatOpen
                ? "fixed inset-y-0 left-0 w-4/5 max-w-sm overflow-y-auto md:relative md:block"
                : "hidden md:block"
            }`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 className="hidden md:block text-md font-bold capitalize">
                {groupName} Messages
              </h1>
              <h2 className="text-lg font-semibold">Inbox</h2>
              <button
                className="md:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                >
                  {user.hasProfilePic ? (
                    <div className="relative">
                      <Image
                        src={"/assets/home-service/home.jpg"}
                        width={48}
                        height={48}
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-medium">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold truncate">
                        {user.firstName} {user.lastName}
                      </h5>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        2:30 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {user.lastMessage}
                      </p>
                      {user.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {user.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area - shown on mobile when a chat is selected */}
          <div
            className={`flex-1 flex flex-col ${
              mobileChatOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {/* Chat header with back button on mobile */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                className="md:hidden p-1 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileChatOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <div className="relative">
                <Image
                  src={"/assets/home-service/home.jpg"}
                  width={40}
                  height={40}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <h5 className="font-semibold">
                  {selectedUser
                    ? `${selectedUser.firstName} ${selectedUser.lastName}`
                    : "Select a chat"}
                </h5>
                <p className="text-xs text-green-500">
                  {selectedUser?.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedUser ? (
                <div className="flex flex-col gap-4">
                  {/* Received message */}
                  <div className="flex items-start gap-2">
                    <div className="relative">
                      <Image
                        src={"/assets/home-service/home.jpg"}
                        width={32}
                        height={32}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg py-2 px-3 max-w-xs">
                      <p className="text-sm">Hello there! How are you doing?</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                        2:25 PM
                      </p>
                    </div>
                  </div>

                  {/* Sent message */}
                  <div className="flex justify-end">
                    <div className="bg-sky-500 text-white rounded-lg py-2 px-3 max-w-xs">
                      <p className="text-sm">
                        I&apos;m doing great! Thanks for asking.
                      </p>
                      <p className="text-xs text-sky-100 text-right mt-1">
                        2:26 PM
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p>Select a conversation to start chatting</p>
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Paperclip size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Camera size={20} />
                </button>

                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                  disabled={!selectedUser}
                />

                <button
                  className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 disabled:opacity-50"
                  disabled={!selectedUser}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar - hidden on mobile */}
          <div className="hidden lg:block w-64 p-4 border-l border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h3 className="font-semibold mb-2">Get the mobile app</h3>
              <div className="flex flex-col gap-2">
                <button className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition">
                  Download for iOS
                </button>
                <button className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition">
                  Download for Android
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Group Members</h4>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-2">
                    {user.hasProfilePic ? (
                      <div className="relative">
                        <Image
                          src={"/assets/home-service/home.jpg"}
                          width={32}
                          height={32}
                          alt="profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {user.online && (
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-medium">
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </div>
                        {user.online && (
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                    )}
                    <span className="text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
