// src/pages/admin/AdminDashboard.jsx
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '142', icon: Package, color: 'orange' },
    { title: 'Active Orders', value: '38', icon: ShoppingCart, color: 'green' },
    { title: 'Registered Users', value: '2,847', icon: Users, color: 'blue' },
    { title: 'Revenue', value: 'NPR 1.2M', icon: DollarSign, color: 'purple' },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon size={32} className="text-orange-500 opacity-70" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
              Add New Product
            </button>
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900">
              View Recent Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}