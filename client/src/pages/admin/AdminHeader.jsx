import { Search } from "lucide-react";
// src/components/admin/AdminHeader.jsx
export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
