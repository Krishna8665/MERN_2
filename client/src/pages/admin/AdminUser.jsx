import { Trash2 } from "lucide-react";

// src/pages/admin/AdminUsers.jsx
export default function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Ram Bahadur",
      email: "ram@example.com",
      phone: "9801234567",
      role: "customer",
      joined: "2025-10-15",
    },
    {
      id: 2,
      name: "Sita Sharma",
      email: "sita@example.com",
      phone: "9812345678",
      role: "customer",
      joined: "2025-11-02",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Users</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium
                    ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                <td className="px-6 py-4">
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
