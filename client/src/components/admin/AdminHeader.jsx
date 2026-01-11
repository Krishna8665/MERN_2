// src/components/admin/AdminHeader.jsx
import { Menu, Bell, Search } from 'lucide-react';

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Mobile Menu Toggle + Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>

          {/* Right - Search + Notifications + Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search - hidden on very small screens */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-orange-600 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">Admin</span>
                <span className="text-xs text-gray-500">admin@momohub.com</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}