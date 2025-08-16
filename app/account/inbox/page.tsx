import InboxGroup from "@/components/account/GroupInbox";

export default function InboxPage() {
  return (
    <div className="bg-gray-50 min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <InboxGroup />
      </div>
    </div>
  );
}
