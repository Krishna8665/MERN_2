// src/components/admin/UserRow.jsx
import { Trash2 } from "lucide-react";

export default function UserRow({ user, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {user.userEmail}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {user.userPhoneNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => onDelete?.(user._id)}
          className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Delete user"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
