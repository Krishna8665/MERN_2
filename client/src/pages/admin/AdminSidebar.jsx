// src/components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  Users,
  LogOut,
  X,
} from "lucide-react";

export default function AdminSidebar({ onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/products/new", icon: PackagePlus, label: "Add Product" },
    { to: "/admin/users", icon: Users, label: "Users", end: true },
  ];

  const handleLogout = () => {
    console.log("Logout clicked"); // <-- test if click works
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white w-64 z-50 pointer-events-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-bold text-orange-500">MomoHub Admin</h2>
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
